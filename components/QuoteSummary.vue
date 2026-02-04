<template>
    <section aria-labelledby="quote-title" class="quote-panel">
        <div class="d-flex align-items-start justify-content-between mb-3 gap-2">
            <h2 id="quote-title" class="h6 fw-semibold text-white mb-0">
                Quote Summary
            </h2>
            <div class="text-end">
                <div class="h3 h2-sm fw-bold text-primary mb-0" aria-label="Total price: $42.50">
                    $42.50
                </div>
                <small class="text-secondary text-uppercase d-block" style="font-size: 0.65rem;">
                    Estimated Total
                </small>
            </div>
        </div>

        <p class="small text-muted mb-3">File: planetary_gear_v2.stl</p>

        <!-- Price Breakdown -->
        <dl class="price-breakdown mb-3 pb-3 border-bottom border-secondary">
            <div class="d-flex justify-content-between small mb-2">
                <dt class="text-secondary-light fw-normal">Material (142g)</dt>
                <dd class="text-white mb-0">$18.40</dd>
            </div>
            <div class="d-flex justify-content-between small mb-2">
                <dt class="text-secondary-light fw-normal">Print Time (8h 42m)</dt>
                <dd class="text-white mb-0">$15.00</dd>
            </div>
            <div class="d-flex justify-content-between small">
                <dt class="text-secondary-light fw-normal">Service & Handling</dt>
                <dd class="text-white mb-0">$9.10</dd>
            </div>
        </dl>

        <!-- Delivery Info -->
        <div class="delivery-info mb-3" role="status" aria-live="polite">
            <div class="d-flex gap-2">
                <i class="bi bi-truck text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
                <div>
                    <div class="small fw-semibold text-white mb-1">Estimated Delivery</div>
                    <div class="small text-secondary-light">
                        <time datetime="2024-10-24">Oct 24</time> - <time datetime="2024-10-26">Oct
                            26</time> (Express Available)
                    </div>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="row g-2">
            <div class="col-6">
                <button type="button" class="btn btn-outline-secondary w-100" aria-label="Save current configuration">
                    Save Config
                </button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-primary w-100" aria-label="Proceed to checkout and order now">
                    <i class="bi bi-cart-fill me-1" aria-hidden="true"></i>
                    Order Now
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

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
</style>