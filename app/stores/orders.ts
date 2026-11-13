import { defineStore } from "pinia"
import { ref, computed, shallowRef } from "vue"

export const useOrderStore = defineStore("order", () => {
  const orders = shallowRef<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getUserOrders = computed(() => orders.value ?? [])

  async function fetchUserOrders() {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<any[]>(
        `${useRuntimeConfig().public.API_BASE_URL}/orders`,
        {
          credentials: "include",
        },
      )
      orders.value = response
    } catch (err) {
      console.error("Failed to fetch user orders:", err)
      error.value = "Failed to load orders. Please try again."
    } finally {
      loading.value = false
    }
  }

  async function cancelOrder(orderId: string) {
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/orders/${orderId}/cancel`,
        {
          method: "POST",
          credentials: "include",
        },
      )
      await fetchUserOrders()
    } catch (err) {
      console.error("Failed to cancel order:", err)
      error.value = "This order can no longer be cancelled."
    }
  }

  async function requestRefund(orderId: string) {
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/orders/${orderId}/refund-request`,
        {
          method: "POST",
          credentials: "include",
        },
      )
      await fetchUserOrders()
    } catch (err) {
      console.error("Failed to request refund:", err)
      error.value = "This order cannot be refunded."
    }
  }

  return {
    orders,
    loading,
    error,
    getUserOrders,
    fetchUserOrders,
    cancelOrder,
    requestRefund,
  }
})
