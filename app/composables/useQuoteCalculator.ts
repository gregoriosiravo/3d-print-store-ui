import { storeToRefs } from 'pinia'

export const useQuoteCalculator = () => {
  const quoteStore = useQuoteStore()
  const userStore = useUserStore()

  const formData = reactive({
    stl: null as File | null,
    materialId: null as number | null,
    layerHeight: null as number | null,
    infillDensity: null as number | null,
  })

  const uploadedFile = ref<File | null>(null)
  const isRequestInProgress = ref(false)

  const isAuthenticated = computed(() => userStore.isAuthenticated)

  const { quote, pricing, materialWeightGrams, estimatedPrintTimeMinutes } = storeToRefs(quoteStore)

  const handleFileSelected = (file: File) => {
    uploadedFile.value = file
    formData.materialId ??= 1
    formData.layerHeight ??= 0.2
    formData.infillDensity ??= 25
    formData.stl = file
  }

  const handleMaterialSelected = (material: { id: number }) => {
    formData.materialId = material.id
  }

  const handleProfileSelected = (profile: { layerHeight: string; infillDensity: string | number }) => {
    formData.layerHeight = parseFloat(profile.layerHeight)
    formData.infillDensity = parseInt(String(profile.infillDensity))
  }

  // A change made while a request runs is queued and sent once it finishes, not dropped
  let quotePending = false

  const sendQuote = async () => {
    const { stl, materialId, layerHeight, infillDensity } = formData
    if (!stl || !materialId || !layerHeight || !infillDensity) return

    if (isRequestInProgress.value) {
      quotePending = true
      return
    }
    isRequestInProgress.value = true

    try {
      const payload = new FormData()
      payload.append('stl', stl)
      payload.append('materialId', materialId.toString())
      payload.append('layerHeight', layerHeight.toString())
      payload.append('infillDensity', infillDensity.toString())

      await quoteStore.createQuote(payload)
    } catch (error) {
      console.error('Error creating quote:', error)
    } finally {
      isRequestInProgress.value = false
      if (quotePending) {
        quotePending = false
        sendQuote()
      }
    }
  }

  watch(
    formData,
    () => sendQuote(),
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

  // Creates the order from the current quote, then opens checkout for it.
  // Guests log in first; the login page attaches the quote to their account.
  const orderNow = async () => {
    if (!isAuthenticated.value) {
      await navigateTo({
        path: '/login',
        query: { action: 'save-quote', quoteId: quoteStore.quoteId, redirect: '/' },
      })
      return
    }
    if (!quoteStore.quoteId) {
      alert('Upload a file and choose your options first.')
      return
    }
    const order = await quoteStore.approveQuote(quoteStore.quoteId)
    if (order) {
      await navigateTo(`/checkout/${order.orderId}`)
    } else {
      alert('Could not create the order. Please try again.')
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
