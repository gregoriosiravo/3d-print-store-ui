import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const usePaymentStore = defineStore("payment", () => {
  const payments = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getUserPayments = computed(() => payments.value ?? [])

  async function fetchUserPayments() {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<any[]>(
        `${useRuntimeConfig().public.API_BASE_URL}/payment-methods`,
        {
          credentials: "include",
        },
      )
      payments.value = response
    } catch (err) {
      console.error("Failed to fetch user payment methods:", err)
      error.value = "Failed to load payment methods."
    } finally {
      loading.value = false
    }
  }

  async function createSetupIntent(): Promise<string> {
    const data = await $fetch<{ clientSecret: string }>(
      `${useRuntimeConfig().public.API_BASE_URL}/payment-methods/setup-intent`,
      {
        credentials: "include",
        method: "POST",
      },
    )
    return data.clientSecret
  }

  async function savePaymentMethod(paymentMethodId: string, makeDefault = false) {
    loading.value = true
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/payment-methods/save`,
        {
          credentials: "include",
          method: "POST",
          body: { paymentMethodId, makeDefault },
        },
      )
      await fetchUserPayments()
    } catch (err) {
      console.error("Failed to save payment method:", err)
      error.value = "Failed to save payment method."
    } finally {
      loading.value = false
    }
  }

  async function setDefaultPaymentMethod(paymentMethodId: string) {
    loading.value = true
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/payment-methods/${paymentMethodId}/default`,
        {
          credentials: "include",
          method: "PUT",
        },
      )
      await fetchUserPayments()
    } catch (err) {
      console.error("Failed to set default payment method:", err)
      error.value = "Failed to update payment method."
    } finally {
      loading.value = false
    }
  }

  async function deletePaymentMethod(paymentMethodId: string) {
    loading.value = true
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/payment-methods/${paymentMethodId}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      )
      await fetchUserPayments()
    } catch (err) {
      console.error("Failed to delete payment method:", err)
      error.value = "Failed to delete payment method."
    } finally {
      loading.value = false
    }
  }

  return {
    payments,
    loading,
    error,
    getUserPayments,
    fetchUserPayments,
    createSetupIntent,
    savePaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
  }
})
