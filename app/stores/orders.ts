import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as any[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getUserOrders: (state): any[] => state.orders ?? [],
  },
  actions: {
    async fetchUserOrders() {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<any[]>(
          `${useRuntimeConfig().public.API_BASE_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${useCookie("auth_token").value}`,
            },
          },
        );
        this.orders = response;
        console.log("Fetched user orders:", this.orders);
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
        this.error = "Failed to load orders. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
});
