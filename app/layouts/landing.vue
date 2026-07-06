<template>
    <UiNavbar />

    <main id="main-content" class="flex-grow-1">
        <slot />
    </main>

    <LazyUiFooter />
</template>

<script setup lang="ts">
const LazyUiFooter = defineLazyHydrationComponent('idle', () => import('~/components/ui/Footer.vue'))
</script>

<style scoped>
.bg-dark-deep {
    background-color: #0a1628;
}

.skip-to-main {
    position: absolute;
    top: -40px;
    left: 0;
    background: #3b82f6;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
}

.skip-to-main:focus {
    top: 0;
}
</style>
