import { defineStore } from "pinia";

export const useAddressStore = defineStore("address", {
  state: () => ({
    addresses: [] as any[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getUserAddresses: (state): any[] => state.addresses ?? [],
  },
  actions: {
    async fetchUserAddresses(userId: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<any[]>(
          `${useRuntimeConfig().public.API_BASE_URL}/address/${userId}/addresses`,
          {
            headers: {
              Authorization: `Bearer ${useCookie("auth_token").value}`,
            },
          },
        );
        this.addresses = response;
        console.log("Fetched user addresses:", this.addresses);
      } catch (err) {
        console.error("Failed to fetch user addresses:", err);
        this.error = "Failed to load addresses. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async addAddress(userId: string, addressData: any) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch(
          `${useRuntimeConfig().public.API_BASE_URL}/address/${userId}/add`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${useCookie("auth_token").value}`,
            },
            body: addressData,
          },
        );
        console.log("Address added successfully:", response);
        await this.fetchUserAddresses(userId);
      } catch (err) {
        console.error("Failed to add address:", err);
        this.error = "Failed to add address. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
});
