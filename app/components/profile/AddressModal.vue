<template>
    <!-- Backdrop -->
    <div class="modal-backdrop fade show"></div>

    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Address</h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body ">
                    <AddressForm ref="addressForm" :addressPrecompiled="props.addressPrecompiled" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveAddress">Save
                        changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AddressForm from '../AddressForm.vue'
const props = defineProps<{
    addressPrecompiled?: Record<string, any> | null
}>()
const emit = defineEmits(['close', 'save'])
const addressForm = ref<InstanceType<typeof AddressForm> | null>(null)
const saveAddress = () => {
    emit('save', addressForm.value?.form)
}
</script>

<style scoped>
.modal-backdrop {
    z-index: 1040;
}

.modal {
    z-index: 1050;
}

.modal-title {
    color: #333;
    font-weight: bold;
    font-size: 1.25rem;
}
</style>
