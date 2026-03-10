<template>
    <section aria-labelledby="quote-title" class="quote-panel">
        <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
            <h2 id="quote-title" class="h6 fw-semibold text-white mb-0">
                Quote Summary
            </h2>
            <div class="text-end">
                <div class="h3 h2-sm fw-bold text-primary mb-0" aria-label="Total price">
                    €{{ formattedTotalPrice }}
                </div>
                <small class="text-secondary text-uppercase d-block" style="font-size: 0.65rem;">
                    Estimated Total
                </small>
            </div>
        </div>

        <p class="small  mb-3">File: {{ fileName || 'No file selected' }}</p>

        <!-- Price Breakdown -->
        <dl class="price-breakdown mb-3 pb-3 border-bottom border-secondary">
            <div class="d-flex justify-content-between small mb-2">
                <dt class="text-secondary-light fw-normal">
                    Material ({{ formattedWeight }}g)
                </dt>
                <dd class="text-white mb-0">€{{ formattedMaterialCost }}</dd>
            </div>
            <div class="d-flex justify-content-between small mb-2">
                <dt class="text-secondary-light fw-normal">
                    Print Time ({{ formattedPrintTime }} min)
                </dt>
                <dd class="text-white mb-0">€{{ formattedMachineCost }}</dd>
            </div>
            <div class="d-flex justify-content-between small">
                <dt class="text-secondary-light fw-normal">Service & Handling</dt>
                <dd class="text-white mb-0">€{{ formattedServiceCost }}</dd>
            </div>
        </dl>
        <div class="delivery-info mb-3" role="status" aria-live="polite">
            <div class="d-flex gap-2">
                <i class="bi bi-truck text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
                <div>
                    <div class="small fw-semibold text-white mb-1">Estimated Delivery</div>
                    <div class="small text-secondary-light">
                        {{ deliveryDate }} (Express Delivery)
                    </div>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="row g-2">
            <div class="col-6">
                <button @click="saveQuote()" :disabled="!quote" type="button" class="btn btn-outline-secondary w-100"
                    aria-label="Save current configuration">
                    Save Quote
                </button>
            </div>
            <div class="col-6">
                <button @click="orderNow()" :disabled="!quote" type="button" class="btn btn-primary w-100"
                    aria-label="Proceed to checkout and order now">
                    <i class="bi bi-cart-fill me-1" aria-hidden="true"></i>
                    Order Now
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Quote, QuotePricing } from '~/types/quote'

const props = defineProps<{
    quote: Quote | null
    pricing: QuotePricing | null
    fileName: string | null
    materialWeightGrams: number | null
    estimatedPrintTimeMinutes: number | null
}>()


const deliveryDate = computed(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    date.setDate(date.getDate() + 6);
    const formattedLong = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return formatted + ' - ' + formattedLong;
})

const formattedTotalPrice = computed(() =>
    props.pricing?.totalPrice?.toFixed(2) ?? '0.00'
)

const formattedMaterialCost = computed(() =>
    props.pricing?.materialCost?.toFixed(2) ?? '0.00'
)

const formattedMachineCost = computed(() =>
    props.pricing?.machineCost?.toFixed(2) ?? '0.00'
)

const formattedServiceCost = computed(() => {
    let serviceCost = (props.pricing?.totalPrice ?? 0) - ((props.pricing?.materialCost ?? 0) + (props.pricing?.laborCost ?? 0) + (props.pricing?.machineCost ?? 0));
    return serviceCost.toFixed(2);
}
)

const formattedWeight = computed(() =>
    props.materialWeightGrams?.toFixed(2) ?? '0'
)

const formattedPrintTime = computed(() =>
    props.estimatedPrintTimeMinutes ?? '0'
)

const hasPricing = computed(() => props.pricing !== null)

const emit = defineEmits(
    ['saveQuote', 'orderNow']
);

const saveQuote = () => {
    emit('saveQuote')

}

const orderNow = () => {
    emit('orderNow')
}

</script>


<style scoped>
/* Quote Panel */
.quote-panel {
    background-color: #0d1b2e;
    border-radius: 1rem;
    padding: 1.25rem;
}

@media (min-width: 768px) {
    .quote-panel {
        padding: 1.5rem;
    }
}

.text-secondary-light {
    color: #9ca3af;
}

.delivery-info {
    background-color: #0a1628;
    border: 1px solid #374151;
    border-radius: 0.75rem;
    padding: 1rem;
}
</style>dddd