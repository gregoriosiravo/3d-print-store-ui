<template>
    <div class="py-4 py-lg-5">
        <UiContainer>
            <Hero />
            <div class="row g-3 g-lg-4">
                <div class="col-lg-8">
                    <Upload @file-selected="handleFileSelected" />
                    <Settings @profile-selected="handleProfileSelected" @material-selected="handleMaterialSelected">
                    </Settings>
                </div>
                <div class="col-lg-4">
                    <LiveRender :file="uploadedFile" />

                    <!-- Quote Summary (lazy hydrated when visible) -->
                    <LazyQuoteSummary :quote="quote" :pricing="pricing" :fileName="uploadedFile?.name || null"
                        :materialWeightGrams="materialWeightGrams"
                        :estimatedPrintTimeMinutes="estimatedPrintTimeMinutes" @save-quote="handleSaveQuote"
                        @order-now="handleOrderNow" />

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
import { storeToRefs } from 'pinia'

definePageMeta({
    layout: "landing",
    keepalive: true
})

const LazyQuoteSummary = defineLazyHydrationComponent('visible', () => import('~/components/QuoteSummary.vue'))

const quoteStore = useQuoteStore()
const userStore = useUserStore()
const router = useRouter()

const { quote, pricing, materialWeightGrams, estimatedPrintTimeMinutes } = storeToRefs(quoteStore)
const formData = reactive({
    stl: null as File | null,
    materialId: null as number | null,
    printConfigId: null as number | null
})
const isAuthenticated = computed(() => {
    return userStore.isAuthenticated;
})
const uploadedFile = ref<File | null>(null)

const handleFileSelected = (file: File) => {
    uploadedFile.value = file
    formData.stl = file
}
const handleMaterialSelected = (material: any) => {
    formData.materialId = material.id;
}
const handleProfileSelected = (profile: any) => {
    let profileId: number | null = checkPrintProfile(profile);
    formData.printConfigId = profileId;
}
const checkPrintProfile = (profile: any): number | null => {
    const infill = typeof profile.infillDensity === 'string'
        ? parseInt(profile.infillDensity)
        : profile.infillDensity
    if (profile.layerHeight === '0.3mm' && infill === 15) return 1
    if (profile.layerHeight === '0.2mm' && infill === 25) return 2
    if (profile.layerHeight === '0.1mm' && infill === 25) return 3
    if (profile.layerHeight === '0.2mm' && infill === 50) return 4
    return 2 // Default to Standard Quality if no match
}
const isRequestInProgress = ref(false)
watch(
    formData,
    async (newFormData) => {
        if (newFormData.stl) {
            if (!newFormData.materialId) newFormData.materialId = 1
            if (!newFormData.printConfigId) newFormData.printConfigId = 2
        }
        if (newFormData.stl && newFormData.materialId && newFormData.printConfigId) {
            console.log('Calculating quote with form data:', newFormData)
            if (isRequestInProgress.value) {
                console.log('Request already in progress, skipping...')
                return
            }
            isRequestInProgress.value = true
            try {
                const payload = new FormData()
                payload.append('stl', newFormData.stl)
                payload.append('materialId', newFormData.materialId.toString())
                payload.append('printConfigId', newFormData.printConfigId.toString())

                await quoteStore.createQuote(payload)

            } catch (error) {
                console.error('Error creating quote:', error)
            } finally {
                isRequestInProgress.value = false
            }
        }
    },
    { deep: true }
)
const handleSaveQuote = () => {
    if (isAuthenticated.value && quoteStore.quoteId && userStore.userId) {
        quoteStore.associateQuoteWithUser(userStore.userId, quoteStore.quoteId)
        alert('Quote saved successfully!')
    } else {
        navigateTo({
            path: '/login',
            query: {
                action: 'save-quote',
                quoteId: quoteStore.quoteId
            }
        })
    }
}

const handleOrderNow = () => {
    if (isAuthenticated.value) {
        alert('Proceeding to checkout!')
    } else {
        router.push('/login')
        alert('Please log in to proceed to checkout.')
    }
}

// SEO Meta Tags
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
