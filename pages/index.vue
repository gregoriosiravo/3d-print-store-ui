<template>
    <div class="py-4 py-lg-5">
        <UiContainer>
            <Hero />
            <div class="row g-3 g-lg-4">
                <!-- Left Column -->
                <div class="col-lg-8">
                    <Upload @file-selected="handleFileSelected" />
                    <!-- Configuration Settings -->
                    <Settings></Settings>
                </div>

                <!-- Right Column -->
                <div class="col-lg-4">
                    <!-- Model Viewer -->
                    <LiveRender :file="uploadedFile" />

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
import LiveRender from '~/components/LiveRender.vue'

definePageMeta({
    layout: "landing"
})

const uploadedFile = ref<File | null>(null)

const handleFileSelected = (file: File) => {
    console.log('File selected:', file.name)
    uploadedFile.value = file
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
            innerHTML: JSON.stringify({
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
