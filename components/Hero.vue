<template>
    <div class="row align-items-center gy-3">
        <div class="col-lg-8">
            <h1 id="hero-title" class="display-5 display-lg-4 fw-bold text-white mb-3">
                Instant 3D Print Quote
            </h1>
            <p class="lead text-secondary-light mb-3 mb-lg-4">
                Precision industrial-grade manufacturing. Upload your STL, OBJ, or STEP files
                to get real-time pricing.
            </p>
        </div>
        <div class="col-lg-4">
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-lg-end">
                <div class="badge-card" role="status" aria-label="99.8 percent success rate">
                    <i class="bi bi-check-circle-fill text-primary me-2" aria-hidden="true"></i>
                    <span class="small fw-semibold">99.8% Success Rate</span>
                </div>
                <button type="button" class="badge-card badge-card-button" aria-label="Open material guide">
                    <i class="bi bi-file-text me-2" aria-hidden="true"></i>
                    <span class="small fw-semibold">Material Guide</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
/* Badge Cards */
.badge-card {
    background-color: #0d1b2e;
    border: 1px solid #374151;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;
}

.badge-card-button {
    cursor: pointer;
    transition: border-color 0.2s;
    border: none;
    width: 100%;
}

.badge-card-button:hover,
.badge-card-button:focus {
    border-color: #4b5563;
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}
</style>