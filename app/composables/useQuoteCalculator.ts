import { storeToRefs } from 'pinia'

export const useQuoteCalculator = () => {
  const quoteStore = useQuoteStore()
  const userStore = useUserStore()

  const formData = reactive({
    stl: null as File | null,
    materialId: null as number | null,
    printConfigId: null as number | null,
  })

  const uploadedFile = ref<File | null>(null)
  const isRequestInProgress = ref(false)

  const isAuthenticated = computed(() => userStore.isAuthenticated)

  const { quote, pricing, materialWeightGrams, estimatedPrintTimeMinutes } = storeToRefs(quoteStore)

  const handleFileSelected = (file: File) => {
    uploadedFile.value = file
    formData.stl = file
  }

  const handleMaterialSelected = (material: { id: number }) => {
    formData.materialId = material.id
  }

  const handleProfileSelected = (profile: { layerHeight: string; infillDensity: string | number }) => {
    formData.printConfigId = mapPrintProfile(profile)
  }

  const mapPrintProfile = (profile: { layerHeight: string; infillDensity: string | number }): number => {
    const infill = typeof profile.infillDensity === 'string'
      ? parseInt(profile.infillDensity)
      : profile.infillDensity

    if (profile.layerHeight === '0.3mm' && infill === 15) return 1
    if (profile.layerHeight === '0.2mm' && infill === 25) return 2
    if (profile.layerHeight === '0.1mm' && infill === 25) return 3
    if (profile.layerHeight === '0.2mm' && infill === 50) return 4

    return 2
  }

  watch(
    formData,
    async (next) => {
      if (next.stl) {
        if (!next.materialId) next.materialId = 1
        if (!next.printConfigId) next.printConfigId = 2
      }

      if (next.stl && next.materialId && next.printConfigId) {
        if (isRequestInProgress.value) return
        isRequestInProgress.value = true

        try {
          const payload = new FormData()
          payload.append('stl', next.stl)
          payload.append('materialId', next.materialId.toString())
          payload.append('printConfigId', next.printConfigId.toString())

          await quoteStore.createQuote(payload)
        } catch (error) {
          console.error('Error creating quote:', error)
        } finally {
          isRequestInProgress.value = false
        }
      }
    },
    { deep: true },
  )

  const saveQuote = () => {
    if (isAuthenticated.value && quoteStore.quoteId && userStore.userId) {
      quoteStore.associateQuoteWithUser(userStore.userId, quoteStore.quoteId)
      alert('Quote saved successfully!')
    } else {
      navigateTo({
        path: '/login',
        query: { action: 'save-quote', quoteId: quoteStore.quoteId },
      })
    }
  }

  const orderNow = () => {
    if (isAuthenticated.value) {
      alert('Proceeding to checkout!')
    } else {
      navigateTo('/login')
      alert('Please log in to proceed to checkout.')
    }
  }

  return {
    formData,
    uploadedFile,
    isRequestInProgress,
    quote,
    pricing,
    materialWeightGrams,
    estimatedPrintTimeMinutes,
    handleFileSelected,
    handleMaterialSelected,
    handleProfileSelected,
    saveQuote,
    orderNow,
  }
}
