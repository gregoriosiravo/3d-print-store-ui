<template>
    <section aria-labelledby="config-title" class="config-panel">
        <div class="d-flex align-items-center mb-3 mb-lg-4">
            <div class="info-badge me-2" aria-hidden="true">
                <i class="bi bi-info-circle"></i>
            </div>
            <h2 id="config-title" class="h5 fw-semibold text-white mb-0">
                Configuration Settings
            </h2>
        </div>

        <!-- Material Selection -->
        <fieldset class="mb-4">
            <legend class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                Select Material
            </legend>
            <div class="row g-3">
                <div class="col-md-4 col-sm-6">
                    <UiInput id="material-pla" name="material" type="radio" :checked="true"
                        label-class="material-card w-100" label-for="material-pla">

                        <div class="d-flex align-items-center mb-2">
                            <div class="material-icon bg-primary-subtle me-2" aria-hidden="true">
                                <i class="bi bi-box"></i>
                            </div>
                            <span class="fw-semibold text-white">PLA Standard</span>
                        </div>
                        <p class="small text-secondary-light mb-0">Prototyping & Models</p>
                    </UiInput>
                </div>
                <div class="col-md-4 col-sm-6">
                    <UiInput id="material-abs" name="material" type="radio" label-class="material-card w-100">
                        <div class="d-flex align-items-center mb-2">
                            <div class="material-icon bg-warning-subtle me-2" aria-hidden="true">
                                <i class="bi bi-fire"></i>
                            </div>
                            <span class="fw-semibold text-white">ABS Tough</span>
                        </div>
                        <p class="small text-secondary-light mb-0">Mechanical & Heat</p>
                    </UiInput>
                </div>
                <div class="col-md-4 col-sm-6">
                    <UiInput id="material-resin" name="material" type="radio" label-class="material-card w-100">
                        <div class="d-flex align-items-center mb-2">
                            <div class="material-icon bg-purple-subtle me-2" aria-hidden="true">
                                <i class="bi bi-droplet"></i>
                            </div>
                            <span class="fw-semibold text-white">Resin (SLA)</span>
                        </div>
                        <p class="small text-secondary-light mb-0">Ultra-High Detail</p>
                    </UiInput>
                </div>
            </div>
        </fieldset>

        <!-- Layer Height & Infill Density -->
        <div class="row g-3 g-lg-4 mb-4">
            <div class="col-md-6">
                <fieldset>
                    <legend class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                        Layer Height
                    </legend>
                    <div class="btn-group w-100" role="group" aria-label="Layer height options">
                        <UiInput id="layer01" name="layerHeight" type="radio" :checked="true"
                            label-class="btn btn-layer">
                            0.1mm
                        </UiInput>

                        <UiInput id="layer02" name="layerHeight" type="radio" label-class="btn btn-layer">
                            0.2mm
                        </UiInput>

                        <UiInput id="layer03" name="layerHeight" type="radio" label-class="btn btn-layer">
                            0.3mm
                        </UiInput>
                    </div>
                </fieldset>
            </div>
            <div class="col-md-6">
                <label for="infillDensity" class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                    Infill Density
                </label>
                <select id="infillDensity" class="form-select form-select-dark" aria-label="Select infill density">
                    <option value="15" selected>15% (Standard)</option>
                    <option value="25">25% (Medium)</option>
                    <option value="50">50% (High)</option>
                    <option value="100">100% (Solid)</option>
                </select>
            </div>
        </div>

        <!-- Color Choice -->
        <fieldset>
            <legend class="form-label text-uppercase text-secondary small fw-semibold mb-3">
                Color Choice
            </legend>
            <div class="d-flex gap-2 gap-sm-3 flex-wrap" role="group" aria-label="Color selection">
                <UiInput id="color-blue" name="color" type="radio" :checked="true" label-class="color-swatch"
                    label-style="background: #3b82f6;" aria-label="Blue color" />

                <UiInput id="color-white" name="color" type="radio" label-class="color-swatch"
                    label-style="background: #ffffff;" aria-label="White color" />

                <UiInput id="color-red" name="color" type="radio" label-class="color-swatch"
                    label-style="background: #ef4444;" aria-label="Red color" />

                <UiInput id="color-sky" name="color" type="radio" label-class="color-swatch"
                    label-style="background: #0ea5e9;" aria-label="Sky blue color" />

                <UiInput id="color-green" name="color" type="radio" label-class="color-swatch"
                    label-style="background: #10b981;" aria-label="Green color" />
            </div>
        </fieldset>
    </section>
</template>

<script lang="ts" setup></script>

<style scoped>
.config-panel {
    background-color: #0d1b2e;
    border-radius: 1rem;
    padding: 1.25rem;
}

@media (min-width: 768px) {
    .config-panel {
        padding: 1.5rem;
    }
}

.info-badge {
    width: 24px;
    height: 24px;
    background-color: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875rem;
    flex-shrink: 0;
}

.material-icon {
    width: 32px;
    height: 32px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.bg-primary-subtle {
    background-color: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
}

.bg-warning-subtle {
    background-color: rgba(251, 146, 60, 0.15);
    color: #fb923c;
}

.bg-purple-subtle {
    background-color: rgba(168, 85, 247, 0.15);
    color: #a855f7;
}

/* Form Select Dark */
.form-select-dark {
    background-color: #1a2942;
    border: none;
    color: #e5e7eb;
    padding: 0.5rem 1rem;
}

.form-select-dark:focus {
    background-color: #1a2942;
    color: #e5e7eb;
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}
</style>