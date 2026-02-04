<template>
    <div class="upload-icon mb-3">
        <i class="bi bi-cloud-upload" aria-hidden="true"></i>
    </div>
    <h2 id="upload-title" class="h5 fw-semibold text-white mb-2">
        Upload 3D Models
    </h2>
    <p class="text-secondary-light mb-3 small">
        Drag and drop your files here or browse your computer.<br class="d-none d-md-inline">
        Supports STL, OBJ, STEP up to 100MB.
    </p>
    <button type="button" class="btn btn-primary px-4" aria-label="Select 3D model files from your computer">
        Select Files
    </button>
    <input type="file" ref="fileInput" class="visually-hidden" accept=".stl,.obj,.step"
        aria-label="Upload 3D model file" />
</template>
<script setup lang="ts"></script>
<style scoped>
.upload-icon {
    width: 64px;
    height: 64px;
    background-color: rgba(59, 130, 246, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.upload-icon i {
    font-size: 2rem;
    color: #3b82f6;
}
</style>