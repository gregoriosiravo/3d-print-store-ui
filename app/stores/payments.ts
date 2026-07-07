import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const usePaymentStore = defineStore("payment", () => {
  const payments = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getUserPayments = computed(() => payments.value ?? [])

  async function fetchUserPayments(userId: string) {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<any[]>(
        `${useRuntimeConfig().public.API_BASE_URL}/payment-methods`,
        {
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
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
        method: "POST",
        headers: {
          Authorization: `Bearer ${useCookie("auth_token").value}`,
        },
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
          method: "POST",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
          body: { paymentMethodId, makeDefault },
        },
      )
      await fetchUserPayments(useCookie("user_id").value ?? "")
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
          method: "PUT",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
      await fetchUserPayments(useCookie("user_id").value ?? "")
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
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
      await fetchUserPayments(useCookie("user_id").value ?? "")
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
