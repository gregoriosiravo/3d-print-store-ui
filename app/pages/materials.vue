<template>
    <UiContainer>
        <section class="py-5">
            <h1 class="h3 text-white mb-2">Materials</h1>
            <p class="text-secondary-light mb-4">The materials we print with. Choose one when you upload a file.</p>
            <p v-if="error" class="text-danger" role="alert">{{ error }}</p>
            <div class="row g-3">
                <div v-for="material in materials" :key="material.id" class="col-md-4">
                    <article class="card bg-dark border-0 rounded-4 p-3 h-100">
                        <h2 class="h5 text-white mb-1">{{ material.name }}</h2>
                        <p class="small text-secondary-light mb-0">{{ material.type }} · {{ material.color }}</p>
                    </article>
                </div>
            </div>
        </section>
    </UiContainer>
</template>

<script setup lang="ts">
definePageMeta({ layout: "landing" })

useHead({ title: 'Materials - PrintFlow 3D' })

const config = useRuntimeConfig()
const materials = ref<{ id: number; name: string; type: string; color: string | null }[]>([])
const error = ref('')

onMounted(async () => {
    try {
        materials.value = await $fetch(`${config.public.API_BASE_URL}/materials`)
    } catch {
        error.value = 'Materials could not be loaded. Please try again later.'
    }
})
</script>
