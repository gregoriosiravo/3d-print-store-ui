<template>
    <UiContainer>
        <section class="py-5">
            <h1 class="h3 text-white mb-2">Printing services</h1>
            <p class="text-secondary-light mb-4">
                Standard print presets. Your quote uses the layer height and infill you choose; these are the usual combinations.
            </p>
            <p v-if="error" class="text-danger" role="alert">{{ error }}</p>
            <div class="table-responsive">
                <table class="table table-dark align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Preset</th>
                            <th scope="col">Layer height</th>
                            <th scope="col">Infill</th>
                            <th scope="col">Supports</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="preset in presets" :key="preset.id">
                            <td>{{ preset.name }}</td>
                            <td>{{ preset.layerHeight }} mm</td>
                            <td>{{ preset.infillPercentage }}%</td>
                            <td>{{ preset.supportEnabled ? 'Yes' : 'No' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </UiContainer>
</template>

<script setup lang="ts">
definePageMeta({ layout: "landing" })

useHead({ title: 'Printing services - PrintFlow 3D' })

const config = useRuntimeConfig()
const presets = ref<{ id: number; name: string; layerHeight: number; infillPercentage: number; supportEnabled: boolean }[]>([])
const error = ref('')

onMounted(async () => {
    try {
        presets.value = await $fetch(`${config.public.API_BASE_URL}/print-presets`)
    } catch {
        error.value = 'Print presets could not be loaded. Please try again later.'
    }
})
</script>
