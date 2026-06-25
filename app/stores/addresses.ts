import { defineStore } from "pinia"
import { ref, computed, shallowRef } from "vue"

export const useAddressStore = defineStore("address", () => {
  const addresses = shallowRef<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getUserAddresses = computed(() => addresses.value ?? [])

  async function fetchUserAddresses(userId: string) {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<any[]>(
        `${useRuntimeConfig().public.API_BASE_URL}/address/${userId}/addresses`,
        {
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
        },
      )
      addresses.value = response
    } catch (err) {
      console.error("Failed to fetch user addresses:", err)
      error.value = "Failed to load addresses. Please try again."
    } finally {
      loading.value = false
    }
  }

  async function addAddress(userId: string, addressData: any) {
    loading.value = true
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/address/${userId}/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
          body: addressData,
        },
      )
      await fetchUserAddresses(userId)
    } catch (err) {
      console.error("Failed to add address:", err)
      error.value = "Failed to add address. Please try again."
    } finally {
      loading.value = false
    }
  }

  async function editAddress(userId: string, addressId: string, addressData: any) {
    loading.value = true
    error.value = null
    try {
      await $fetch(
        `${useRuntimeConfig().public.API_BASE_URL}/address/${userId}/edit/${addressId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${useCookie("auth_token").value}`,
          },
          body: addressData,
        },
      )
      await fetchUserAddresses(userId)
    } catch (err) {
      console.error("Failed to edit address:", err)
      error.value = "Failed to edit address. Please try again."
    } finally {
      loading.value = false
    }
  }

  return {
    addresses,
    loading,
    error,
    getUserAddresses,
    fetchUserAddresses,
    addAddress,
    editAddress,
  }
})
