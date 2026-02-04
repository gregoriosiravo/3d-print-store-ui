<template>
    <section aria-labelledby="upload-title" class="upload-area mb-3 mb-lg-4" role="button" tabindex="0"
        @click="handleUploadClick" @keydown.enter="handleUploadClick" @keydown.space.prevent="handleUploadClick"
        @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop"
        :class="{ 'is-dragging': isDragging }">
        <div class="upload-icon mb-3">
            <i class="bi bi-cloud-upload" aria-hidden="true"></i>
        </div>
        <h2 id="upload-title" class="h5 fw-semibold text-white mb-2">
            Upload 3D Models
        </h2>
        <p class="text-secondary-light mb-3 small">
            Drag and drop your files here or browse your computer.<br class="d-none d-md-inline">
            Supports STL, OBJ, STEP up to 100MB.
        </p>
        <button type="button" class="btn btn-primary px-4" @click.stop="handleUploadClick"
            aria-label="Select 3D model files from your computer">
            Select Files
        </button>
        <input type="file" ref="fileInput" class="visually-hidden" accept=".stl,.obj,.step" @change="handleFileChange"
            aria-label="Upload 3D model file" />

        <!-- Show uploaded file name -->
        <p v-if="fileName" class="mt-3 mb-0 small text-primary">
            <i class="bi bi-file-earmark-check me-1"></i>
            {{ fileName }}
        </p>
    </section>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const fileName = ref('')

const emit = defineEmits<{
    fileSelected: [file: File]
}>()

const handleUploadClick = () => {
    console.log('Upload area clicked')
    fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        processFile(file)
    }
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const file = event.dataTransfer?.files?.[0]

    if (file) {
        processFile(file)
    }
}

const processFile = (file: File) => {
    const validTypes = ['.stl', '.obj', '.step']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()

    if (!validTypes.includes(fileExtension)) {
        alert('Please upload a valid file (.stl, .obj, or .step)')
        return
    }

    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
        alert('File size must be less than 100MB')
        return
    }

    fileName.value = file.name
    emit('fileSelected', file)
}
</script>

<style scoped>
.upload-area {
    background-color: #0d1b2e;
    border: 2px dashed #374151;
    border-radius: 1rem;
    padding: 2rem 1rem;
    text-align: center;
    transition: border-color 0.3s, background-color 0.3s;
    cursor: pointer;
}

.upload-area:hover,
.upload-area.is-dragging {
    border-color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.05);
}

@media (min-width: 768px) {
    .upload-area {
        padding: 3rem 2rem;
    }
}

.upload-icon {
    width: 64px;
    height: 64px;
    background-color: rgba(59, 130, 246, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.upload-icon i {
    font-size: 2rem;
    color: #3b82f6;
}
</style>
