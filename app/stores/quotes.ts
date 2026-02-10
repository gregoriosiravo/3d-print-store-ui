import { defineStore } from "pinia";
import type { Quote, QuotePricing } from "~/types/quote";

export const useQuoteStore = defineStore("quote", {
  state: () => ({
    quotes: [] as Quote[],
    loading: false,
    error: null as string | null,
    quote: null as Quote | null,
    pricing: null as QuotePricing | null,
    materialWeightGrams: null as number | null,
    estimatedPrintTimeMinutes: null as number | null,
  }),
  getters: {
    hasQuote: (state): boolean => state.quote !== null,
    isLoading: (state): boolean => state.loading,
    hasError: (state): string | null => state.error,
    totalPrice: (state): number => state.pricing?.totalPrice || 0,
  },
  actions: {
    async createQuote(formData: FormData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<Quote>(
          `${useRuntimeConfig().public.API_BASE_URL}/quote`,
          {
            method: "POST",
            body: formData,
          },
        );
        this.quote = response;
        this.pricing = response.pricing;
        this.materialWeightGrams = response.materialWeightGrams;
        this.estimatedPrintTimeMinutes = response.estimatedPrintTimeMinutes;
        console.log("Quote creation successful, quote:", this.quote);
      } catch (err) {
        console.error("Quote creation failed:", err);
        this.error = "Failed to create quote. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
});
