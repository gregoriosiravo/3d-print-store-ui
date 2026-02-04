<template>
    <div class="py-4 py-lg-5">
        <UiContainer>
            <!-- Hero Section -->
            <section aria-labelledby="hero-title" class="mb-4 mb-lg-5">
                <Hero />
            </section>

            <!-- Main Content Grid -->
            <div class="row g-3 g-lg-4">
                <!-- Left Column -->
                <div class="col-lg-8">
                    <!-- File Upload Area -->
                    <section aria-labelledby="upload-title" class="upload-area mb-3 mb-lg-4" role="button" tabindex="0"
                        @click="handleUploadClick" @keydown.enter="handleUploadClick"
                        @keydown.space.prevent="handleUploadClick">
                        <Upload />
                    </section>

                    <!-- Configuration Settings -->
                    <section aria-labelledby="config-title" class="config-panel">
                        <div class="d-flex align-items-center mb-3 mb-lg-4">
                            <div class="info-badge me-2" aria-hidden="true">
                                <i class="bi bi-info-circle"></i>
                            </div>
                            <h2 id="config-title" class="h5 fw-semibold text-white mb-0">
                                Configuration Settings
                            </h2>
                        </div>

                        <!-- Material Selection -->
                        <fieldset class="mb-4">
                            <legend class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                                Select Material
                            </legend>
                            <div class="row g-3">
                                <div class="col-md-4 col-sm-6">
                                    <input type="radio" class="btn-check" name="material" id="material-pla"
                                        autocomplete="off" checked>
                                    <label class="material-card w-100" for="material-pla">
                                        <div class="d-flex align-items-center mb-2">
                                            <div class="material-icon bg-primary-subtle me-2" aria-hidden="true">
                                                <i class="bi bi-box"></i>
                                            </div>
                                            <span class="fw-semibold text-white">PLA Standard</span>
                                        </div>
                                        <p class="small text-secondary-light mb-0">Prototyping & Models</p>
                                    </label>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <input type="radio" class="btn-check" name="material" id="material-abs"
                                        autocomplete="off">
                                    <label class="material-card w-100" for="material-abs">
                                        <div class="d-flex align-items-center mb-2">
                                            <div class="material-icon bg-warning-subtle me-2" aria-hidden="true">
                                                <i class="bi bi-fire"></i>
                                            </div>
                                            <span class="fw-semibold text-white">ABS Tough</span>
                                        </div>
                                        <p class="small text-secondary-light mb-0">Mechanical & Heat</p>
                                    </label>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <input type="radio" class="btn-check" name="material" id="material-resin"
                                        autocomplete="off">
                                    <label class="material-card w-100" for="material-resin">
                                        <div class="d-flex align-items-center mb-2">
                                            <div class="material-icon bg-purple-subtle me-2" aria-hidden="true">
                                                <i class="bi bi-droplet"></i>
                                            </div>
                                            <span class="fw-semibold text-white">Resin (SLA)</span>
                                        </div>
                                        <p class="small text-secondary-light mb-0">Ultra-High Detail</p>
                                    </label>
                                </div>
                            </div>
                        </fieldset>

                        <!-- Layer Height & Infill Density -->
                        <div class="row g-3 g-lg-4 mb-4">
                            <div class="col-md-6">
                                <fieldset>
                                    <legend class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                                        Layer Height
                                    </legend>
                                    <div class="btn-group w-100" role="group" aria-label="Layer height options">
                                        <input type="radio" class="btn-check" name="layerHeight" id="layer01"
                                            autocomplete="off" checked>
                                        <label class="btn btn-layer" for="layer01">0.1mm</label>

                                        <input type="radio" class="btn-check" name="layerHeight" id="layer02"
                                            autocomplete="off">
                                        <label class="btn btn-layer" for="layer02">0.2mm</label>

                                        <input type="radio" class="btn-check" name="layerHeight" id="layer03"
                                            autocomplete="off">
                                        <label class="btn btn-layer" for="layer03">0.3mm</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <label for="infillDensity"
                                    class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                                    Infill Density
                                </label>
                                <select id="infillDensity" class="form-select form-select-dark"
                                    aria-label="Select infill density">
                                    <option value="15" selected>15% (Standard)</option>
                                    <option value="25">25% (Medium)</option>
                                    <option value="50">50% (High)</option>
                                    <option value="100">100% (Solid)</option>
                                </select>
                            </div>
                        </div>

                        <!-- Color Choice -->
                        <fieldset>
                            <legend class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                                Color Choice
                            </legend>
                            <div class="d-flex gap-2 gap-sm-3 flex-wrap" role="group" aria-label="Color selection">
                                <input type="radio" class="btn-check" name="color" id="color-blue" autocomplete="off"
                                    checked>
                                <label class="color-swatch" for="color-blue" style="background: #3b82f6;"
                                    aria-label="Blue color"></label>

                                <input type="radio" class="btn-check" name="color" id="color-white" autocomplete="off">
                                <label class="color-swatch" for="color-white" style="background: #ffffff;"
                                    aria-label="White color"></label>

                                <input type="radio" class="btn-check" name="color" id="color-red" autocomplete="off">
                                <label class="color-swatch" for="color-red" style="background: #ef4444;"
                                    aria-label="Red color"></label>

                                <input type="radio" class="btn-check" name="color" id="color-sky" autocomplete="off">
                                <label class="color-swatch" for="color-sky" style="background: #0ea5e9;"
                                    aria-label="Sky blue color"></label>

                                <input type="radio" class="btn-check" name="color" id="color-green" autocomplete="off">
                                <label class="color-swatch" for="color-green" style="background: #10b981;"
                                    aria-label="Green color"></label>
                            </div>
                        </fieldset>
                    </section>
                </div>

                <!-- Right Column -->
                <div class="col-lg-4">
                    <!-- Model Viewer -->
                    <section aria-labelledby="viewer-title" class="viewer-panel mb-3 mb-lg-4">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <span id="viewer-title" class="live-badge" role="status">
                                <i class="bi bi-circle-fill me-1" aria-hidden="true"></i>
                                LIVE RENDER
                            </span>
                        </div>

                        <div class="viewer-container" role="img"
                            aria-label="3D model preview - waiting for file upload">
                            <div class="viewer-placeholder">
                                <div class="spinner-rings" aria-hidden="true">
                                    <div class="ring ring-1"></div>
                                    <div class="ring ring-2"></div>
                                    <div class="ring ring-3"></div>
                                </div>
                                <i class="bi bi-gear-fill viewer-icon" aria-hidden="true"></i>
                            </div>

                            <!-- Viewer Controls -->
                            <div class="viewer-controls">
                                <button type="button" class="btn btn-sm btn-viewer-control"
                                    aria-label="Zoom in on 3D model">
                                    <i class="bi bi-search" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-viewer-control"
                                    aria-label="Reset 3D model view">
                                    <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </section>

                    <!-- Quote Summary -->
                    <section aria-labelledby="quote-title" class="quote-panel">
                        <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
                            <h2 id="quote-title" class="h6 fw-semibold text-white mb-0">
                                Quote Summary
                            </h2>
                            <div class="text-end">
                                <div class="h3 h2-sm fw-bold text-primary mb-0" aria-label="Total price: $42.50">
                                    $42.50
                                </div>
                                <small class="text-secondary text-uppercase d-block" style="font-size: 0.65rem;">
                                    Estimated Total
                                </small>
                            </div>
                        </div>

                        <p class="small text-muted mb-3">File: planetary_gear_v2.stl</p>

                        <!-- Price Breakdown -->
                        <dl class="price-breakdown mb-3 pb-3 border-bottom border-secondary">
                            <div class="d-flex justify-content-between small mb-2">
                                <dt class="text-secondary-light fw-normal">Material (142g)</dt>
                                <dd class="text-white mb-0">$18.40</dd>
                            </div>
                            <div class="d-flex justify-content-between small mb-2">
                                <dt class="text-secondary-light fw-normal">Print Time (8h 42m)</dt>
                                <dd class="text-white mb-0">$15.00</dd>
                            </div>
                            <div class="d-flex justify-content-between small">
                                <dt class="text-secondary-light fw-normal">Service & Handling</dt>
                                <dd class="text-white mb-0">$9.10</dd>
                            </div>
                        </dl>

                        <!-- Delivery Info -->
                        <div class="delivery-info mb-3" role="status" aria-live="polite">
                            <div class="d-flex gap-2">
                                <i class="bi bi-truck text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
                                <div>
                                    <div class="small fw-semibold text-white mb-1">Estimated Delivery</div>
                                    <div class="small text-secondary-light">
                                        <time datetime="2024-10-24">Oct 24</time> - <time datetime="2024-10-26">Oct
                                            26</time> (Express Available)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="row g-2">
                            <div class="col-6">
                                <button type="button" class="btn btn-outline-secondary w-100"
                                    aria-label="Save current configuration">
                                    Save Config
                                </button>
                            </div>
                            <div class="col-6">
                                <button type="button" class="btn btn-primary w-100"
                                    aria-label="Proceed to checkout and order now">
                                    <i class="bi bi-cart-fill me-1" aria-hidden="true"></i>
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </section>

                    <!-- Stats Cards -->
                    <div class="row g-2 g-sm-3 mt-2">
                        <div class="col-6">
                            <div class="stat-card" role="status" aria-label="48 printers ready">
                                <i class="bi bi-printer text-primary mb-2" aria-hidden="true"></i>
                                <div class="fw-semibold text-white small">Printers Ready</div>
                                <div class="h6 text-white mb-0">48 Units</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="stat-card" role="status" aria-label="Current queue is approximately 4 hours">
                                <i class="bi bi-clock-history text-primary mb-2" aria-hidden="true"></i>
                                <div class="fw-semibold text-white small">Current Queue</div>
                                <div class="h6 text-white mb-0">~ 4 Hours</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UiContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "landing"
})

const fileInput = ref<HTMLInputElement | null>(null)

const handleUploadClick = () => {
    fileInput.value?.click()
}

useHead({
    title: 'Instant 3D Print Quote - PrintFlow 3D',
    meta: [
        {
            name: 'description',
            content: 'Get instant quotes for precision industrial-grade 3D printing. Upload your STL, OBJ, or STEP files for real-time pricing and fast turnaround.'
        },
        {
            name: 'keywords',
            content: '3D printing quote, instant quote, STL upload, 3D print pricing, industrial 3D printing, PLA, ABS, resin printing'
        },
        { property: 'og:title', content: 'Instant 3D Print Quote - PrintFlow 3D' },
        { property: 'og:description', content: 'Upload your 3D models and get instant pricing for professional 3D printing services.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Instant 3D Print Quote - PrintFlow 3D' },
        { name: 'twitter:description', content: 'Get instant quotes for precision 3D printing' }
    ],
    link: [
        { rel: 'canonical', href: 'https://printflow3d.com' }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: '3D Printing Quote Service',
                provider: {
                    '@type': 'Organization',
                    name: 'PrintFlow 3D Industrial Systems'
                },
                description: 'Instant 3D printing quotes for STL, OBJ, and STEP files',
                areaServed: 'Worldwide',
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: '3D Printing Materials',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: { '@type': 'Product', name: 'PLA Standard 3D Printing' }
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: { '@type': 'Product', name: 'ABS Tough 3D Printing' }
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: { '@type': 'Product', name: 'Resin SLA 3D Printing' }
                        }
                    ]
                }
            })
        }
    ]
})
</script>

<style scoped>
/* Your existing styles - keep all of them */
/* Just removed .bg-dark-deep since it's now in the layout */

.upload-area {
    background-color: #0d1b2e;
    border: 2px dashed #374151;
    border-radius: 1rem;
    padding: 2rem 1rem;
    text-align: center;
    transition: border-color 0.3s, background-color 0.3s;
    cursor: pointer;
}

.bg-dark-deep {
    background-color: #0a1628;
}



/* Upload Area */
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
.upload-area:focus {
    border-color: #3b82f6;
    background-color: rgba(13, 27, 46, 0.7);
    outline: none;
}

@media (min-width: 768px) {
    .upload-area {
        padding: 3rem 2rem;
    }
}



/* Config Panel */
.config-panel {
    background-color: #0d1b2e;
    border-radius: 1rem;
    padding: 1.25rem;
}

@media (min-width: 768px) {
    .config-panel {
        padding: 1.5rem;
    }
}

.info-badge {
    width: 24px;
    height: 24px;
    background-color: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875rem;
    flex-shrink: 0;
}

/* Material Cards */
.btn-check:checked+.material-card {
    border-color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
}

.material-card {
    background-color: #0a1628;
    border: 2px solid #374151;
    border-radius: 0.75rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    display: block;
}

.material-card:hover,
.material-card:focus {
    border-color: #4b5563;
}

.material-icon {
    width: 32px;
    height: 32px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.bg-primary-subtle {
    background-color: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
}

.bg-warning-subtle {
    background-color: rgba(251, 146, 60, 0.15);
    color: #fb923c;
}

.bg-purple-subtle {
    background-color: rgba(168, 85, 247, 0.15);
    color: #a855f7;
}

/* Layer Height Buttons */
.btn-check:checked+.btn-layer {
    background-color: #374151;
    color: #ffffff;
}

.btn-layer {
    background-color: #1a2942;
    border: 1px solid #1a2942;
    color: #9ca3af;
    padding: 0.5rem 0.75rem;
    transition: all 0.2s;
    font-size: 0.875rem;
}

@media (min-width: 768px) {
    .btn-layer {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
}

.btn-layer:hover,
.btn-layer:focus {
    background-color: #374151;
    color: #ffffff;
}

/* Form Select Dark */
.form-select-dark {
    background-color: #1a2942;
    border: none;
    color: #e5e7eb;
    padding: 0.5rem 1rem;
}

.form-select-dark:focus {
    background-color: #1a2942;
    color: #e5e7eb;
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}

/* Color Swatches */
.btn-check:checked+.color-swatch {
    border-color: #ffffff;
    transform: scale(1.1);
}

.color-swatch {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    display: block;
}

.color-swatch:hover,
.color-swatch:focus {
    transform: scale(1.05);
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* Viewer Panel */
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

.viewer-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

/* Animated Rings */
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

/* Quote Panel */
.quote-panel {
    background-color: #0d1b2e;
    border-radius: 1rem;
    padding: 1.25rem;
}

@media (min-width: 768px) {
    .quote-panel {
        padding: 1.5rem;
    }
}

.text-secondary-light {
    color: #9ca3af;
}

.delivery-info {
    background-color: #0a1628;
    border: 1px solid #374151;
    border-radius: 0.75rem;
    padding: 1rem;
}

/* Stat Cards */
.stat-card {
    background-color: #0d1b2e;
    border: 1px solid #374151;
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
}

.stat-card i {
    font-size: 1.25rem;
}

@media (min-width: 768px) {
    .stat-card i {
        font-size: 1.5rem;
    }
}

/* Button Overrides */
.btn-outline-secondary {
    border-color: #374151;
    color: #9ca3af;
}

.btn-outline-secondary:hover,
.btn-outline-secondary:focus {
    background-color: #374151;
    border-color: #374151;
    color: #ffffff;
}

/* Responsive Text */
@media (max-width: 576px) {
    .h2-sm {
        font-size: 1.5rem;
    }
}
</style>
