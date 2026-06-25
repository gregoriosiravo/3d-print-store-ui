import { defineStore } from "pinia"
import { ref, computed, shallowRef } from "vue"
import type { Quote, QuotePricing } from "~/types/quote"
import { useOrderStore } from "./orders"

export const useQuoteStore = defineStore("quote", () => {
  const quotes = shallowRef<Quote[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const quote = ref<Quote | null>(null)
  const pricing = ref<QuotePricing | null>(null)
  const materialWeightGrams = ref<number | null>(null)
  const estimatedPrintTimeMinutes = ref<number | null>(null)

  const hasQuote = computed(() => quote.value !== null)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value)
  const totalPrice = computed(() => pricing.value?.totalPrice || 0)
  const quoteId = computed(() => quote.value?.quoteId || null)
  const getUserQuotes = computed(() => quotes.value ?? [])

  async function createQuote(formData: FormData) {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<Quote>(
        `${useRuntimeConfig().public.API_BASE_URL}/quote`,
        {
          method: "POST",
          body: formData,
        },
      )
      quote.value = response
      pricing.value = response.pricing
      materialWeightGrams.value = response.materialWeightGrams
      estimatedPrintTimeMinutes.value = response.estimatedPrintTimeMinutes
    } catch (err) {
      console.error("Quote creation failed:", err)
      error.value = "Failed to create quote. Please try again."
    } finally {
      loading.value = false
    }
  }

  async function associateQuoteWithUser(userId: string, quoteId: string) {
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/quote/associate`,
        {
          method: "POST",
          body: { userId, quoteId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
    } catch (err) {
      console.error("Error associating quote with user:", err)
      error.value = "Failed to associate quote with user."
    }
  }

  async function fetchUserQuotes() {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<{ quotes: Quote[] }>(
        `${useRuntimeConfig().public.API_BASE_URL}/quotes`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
      quotes.value = data.quotes
    } catch (err) {
      console.error("Failed to fetch user quotes:", err)
      error.value = "Failed to fetch quotes. Please try again."
    } finally {
      loading.value = false
    }
  }

  async function rejectQuote(quoteId: string) {
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/quote/${quoteId}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
      await fetchUserQuotes()
    } catch (err) {
      console.error("Error rejecting quote:", err)
    }
  }

  async function approveQuote(quoteId: string, totalPrice: number) {
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/quote/${quoteId}/approve`,
        {
          method: "POST",
          body: { totalPrice },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
      await fetchUserQuotes()
      await useOrderStore().fetchUserOrders()
    } catch (err) {
      console.error("Error approving quote:", err)
    }
  }

  return {
    quotes,
    loading,
    error,
    quote,
    pricing,
    materialWeightGrams,
    estimatedPrintTimeMinutes,
    hasQuote,
    isLoading,
    hasError,
    totalPrice,
    quoteId,
    getUserQuotes,
    createQuote,
    associateQuoteWithUser,
    fetchUserQuotes,
    rejectQuote,
    approveQuote,
  }
})
