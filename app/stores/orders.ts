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
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
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

  return {
    orders,
    loading,
    error,
    getUserOrders,
    fetchUserOrders,
  }
})
