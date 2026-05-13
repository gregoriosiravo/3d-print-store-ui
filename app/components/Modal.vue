<template>
    <div class="modal" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title color-black ">{{ props.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="emit('close')"></button>
                </div>
                <div class="modal-body color-black ">
                    <p>{{ props.message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="emit('close')">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    title: string,
    message: string
}>()
console.log("Modal props:", props)
const emit = defineEmits(['close'])

</script>

<style scoped>
.color-black {
    color: black;
}
</style>