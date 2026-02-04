<template>
    <section aria-labelledby="viewer-title" class="viewer-panel mb-3 mb-lg-4">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <span id="viewer-title" class="live-badge" role="status">
                <i class="bi bi-circle-fill me-1" aria-hidden="true"></i>
                LIVE RENDER
            </span>
        </div>

        <div class="viewer-container" role="img" aria-label="3D model preview">
            <ClientOnly>
                <!-- Canvas for Three.js -->
                <canvas ref="canvasRef" class="viewer-canvas"></canvas>

                <template #fallback>
                    <!-- Loading state (shown during SSR) -->
                    <div class="viewer-placeholder">
                        <div class="spinner-rings" aria-hidden="true">
                            <div class="ring ring-1"></div>
                            <div class="ring ring-2"></div>
                            <div class="ring ring-3"></div>
                        </div>
                        <i class="bi bi-gear-fill viewer-icon" aria-hidden="true"></i>
                    </div>
                </template>
            </ClientOnly>

            <!-- Viewer Controls -->
            <div class="viewer-controls">
                <button type="button" class="btn btn-sm btn-viewer-control" aria-label="Zoom in on 3D model"
                    @click="handleZoom">
                    <i class="bi bi-search" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-viewer-control" aria-label="Reset 3D model view"
                    @click="handleReset">
                    <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

interface Props {
    file?: File | null
}

const props = defineProps<Props>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let mesh: THREE.Mesh | null = null
let animationId: number | null = null

// Initialize Three.js scene
const initThreeJS = () => {
    if (!canvasRef.value) return

    console.log('Initializing Three.js...')

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a1628)

    // Camera
    const width = canvasRef.value.clientWidth
    const height = canvasRef.value.clientHeight
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    // Grid helper (optional - helps see the scene)
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222)
    scene.add(gridHelper)

    // Controls
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = true

    animate()

    console.log('Three.js initialized!')
}

const loadSTL = async (file: File) => {
    if (!scene) {
        console.error('Scene not initialized')
        return
    }

    console.log('Loading STL file:', file.name)

    if (mesh) {
        console.log('Removing old mesh from scene')
        scene.remove(mesh)
        mesh.geometry.dispose()
            ; (mesh.material as THREE.Material).dispose()
        mesh = null
    }

    const loader = new STLLoader()

    try {
        const arrayBuffer = await file.arrayBuffer()
        const geometry = loader.parse(arrayBuffer)

        console.log('STL loaded, vertices:', geometry.attributes.position?.count)
        geometry.computeBoundingBox()

        const boundingBox = geometry.boundingBox!
        const center = new THREE.Vector3()
        boundingBox.getCenter(center)
        geometry.translate(-center.x, -center.y, -center.z)
        const size = new THREE.Vector3()
        boundingBox.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 3 / maxDim
        geometry.scale(scale, scale, scale)

        geometry.computeVertexNormals()

        const material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            roughness: 0.5,
            metalness: 0.1,
            flatShading: false
        })

        // Create mesh
        mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
        console.log('Mesh position: ', mesh.position)
        console.log('STL mesh added to scene!')

        // Reset camera
        if (camera && controls) {
            camera.position.set(3, 3, 5)
            camera.lookAt(0, 0, 0)
            controls.reset()
        }
    } catch (error) {
        console.error('Error loading STL:', error)
        alert('Error loading STL file. Please make sure it\'s a valid STL file.')
    }
}

// Animation loop
const animate = () => {
    if (!renderer || !scene || !camera || !controls) return

    animationId = requestAnimationFrame(animate)

    controls.update()
    renderer.render(scene, camera)
}

// Handle window resize
const handleResize = () => {
    if (!camera || !renderer || !canvasRef.value) return

    const width = canvasRef.value.clientWidth
    const height = canvasRef.value.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}

// Handle zoom
const handleZoom = () => {
    if (!camera) return
    camera.position.z = Math.max(2, camera.position.z - 1)
}

// Handle reset
const handleReset = () => {
    if (!camera || !controls) return
    camera.position.set(3, 3, 5)
    camera.lookAt(0, 0, 0)
    controls.reset()
}

// Cleanup
const cleanup = () => {
    if (animationId !== null) {
        cancelAnimationFrame(animationId)
    }

    if (mesh) {
        mesh.geometry.dispose()
            ; (mesh.material as THREE.Material).dispose()
    }

    if (renderer) {
        renderer.dispose()
    }

    if (controls) {
        controls.dispose()
    }

    scene = null
    camera = null
    renderer = null
    controls = null
    mesh = null
}

onMounted(async () => {
    console.log('Component mounted')

    await nextTick()

    console.log('After nextTick, canvasRef:', canvasRef.value)

    if (!canvasRef.value) {
        console.error('Canvas still not available!')
        setTimeout(() => {
            console.log('Retry - canvasRef:', canvasRef.value)
            initThreeJS()
        }, 100)
    } else {
        initThreeJS()
    }

    window.addEventListener('resize', handleResize)
})


onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    cleanup()
})

watch(() => props.file, (newFile) => {
    if (newFile) {
        console.log('File received:', newFile.name, 'Size:', newFile.size, 'bytes')
        loadSTL(newFile)
    }
}, { immediate: true })
</script>

<style scoped>
/* Same styles as before */
.viewer-panel {
    background-color: #0d1b2e;
    border-radius: 1rem;
    padding: 1.25rem;
}

@media (min-width: 768px) {
    .viewer-panel {
        padding: 1.5rem;
    }
}

.live-badge {
    color: #3b82f6;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
}

.viewer-container {
    background-color: #0a1628;
    border-radius: 0.75rem;
    aspect-ratio: 1 / 1;
    position: relative;
    overflow: hidden;
}

.viewer-canvas {
    width: 100%;
    height: 100%;
    display: block;
    min-height: 400px;
}

.viewer-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.spinner-rings {
    position: absolute;
    width: 100%;
    height: 100%;
}

.ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 4px solid rgba(59, 130, 246, 0.1);
}

.ring-1 {
    width: 100px;
    height: 100px;
    border-top-color: #3b82f6;
    animation: spin 3s linear infinite;
}

.ring-2 {
    width: 140px;
    height: 140px;
    border-color: rgba(59, 130, 246, 0.05);
}

.ring-3 {
    width: 200px;
    height: 200px;
    border-color: rgba(59, 130, 246, 0.03);
}

@keyframes spin {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.viewer-icon {
    font-size: 3rem;
    color: #3b82f6;
    z-index: 10;
    position: relative;
}

@media (min-width: 768px) {
    .viewer-icon {
        font-size: 5rem;
    }
}

.viewer-controls {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
}

.btn-viewer-control {
    width: 40px;
    height: 40px;
    background-color: #0d1b2e;
    border: 1px solid #374151;
    border-radius: 0.5rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.btn-viewer-control:hover,
.btn-viewer-control:focus {
    background-color: #1a2942;
    color: #ffffff;
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}
</style>
