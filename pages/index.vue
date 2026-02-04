<template>
    <div class="py-4 py-lg-5">
        <UiContainer>
            <Hero />
            <div class="row g-3 g-lg-4">
                <div class="col-lg-8">
                    <Upload @file-selected="handleFileSelected" />
                    <Settings></Settings>
                </div>
                <div class="col-lg-4">
                    <LiveRender :file="uploadedFile" />

                    <!-- Quote Summary -->
                    <QuoteSummary />

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
                            <div class="stat-card" role="status" aria-label="
                             queue is approximately 4 hours">
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
