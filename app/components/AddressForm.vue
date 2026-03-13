<template>
    <form class="address-form card p-4 mb-4">
        <div class="form-group">
            <label for="inputName">Name</label>
            <input v-model="form.firstName" type="text" class="form-control" id="inputName" placeholder="John">
        </div>
        <div class="form-group">
            <label for="inputSurname">Surname</label>
            <input v-model="form.lastName" type="text" class="form-control" id="inputSurname" placeholder="Doe">
        </div>
        <div class="form-group" v-if="!checkout">
            <label for="inputLabel">Nickname</label>
            <input v-model="form.label" type="text" class="form-control" id="inputLabel" placeholder="Home - Office">
        </div>
        <div class="form-group">
            <label for="inputAddress">Address</label>
            <input v-model="form.address" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
        </div>
        <div class="form-group">
            <label for="inputAddress2">Address Information</label>
            <input v-model="form.addressInfo" type="text" class="form-control" id="inputAddress2"
                placeholder="Apartment, studio, or floor">
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="inputCity">City</label>
                <input v-model="form.city" type="text" class="form-control" id="inputCity" placeholder="Rome">
            </div>
            <div class="form-group col-md-3">
                <label for="inputZip">Zip</label>
                <input v-model="form.zip" type="text" class="form-control" id="inputZip" placeholder="00100">
            </div>
            <div class="form-group col-md-4">
                <label for="inputState">Country</label>
                <input v-model="form.country" type="text" class="form-control" id="inputState" placeholder="Lazio">
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="defaultAddress" v-model="form.isPrimary">
                <label class="form-check-label" for="defaultAddress">
                    Make it the default address
                </label>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
const props = defineProps<{
    addressPrecompiled?: Record<string, any> | null
    isCheckout?: boolean
}>()

interface AddressForm {
    firstName: string
    lastName: string
    address: string
    addressInfo: string
    city: string
    zip: string
    country: string
    isPrimary: boolean
    touched: boolean
    label?: string
}

const form = reactive<AddressForm>({
    firstName: props.addressPrecompiled?.first_name ?? '',
    lastName: props.addressPrecompiled?.last_name ?? '',
    address: props.addressPrecompiled?.address ?? '',
    addressInfo: props.addressPrecompiled?.address_info ?? '',
    city: props.addressPrecompiled?.city ?? '',
    zip: props.addressPrecompiled?.zip ?? '',
    country: props.addressPrecompiled?.country ?? '',
    isPrimary: props.addressPrecompiled?.isPrimary ?? false,
    touched: props.addressPrecompiled ? true : false,
    label: props.addressPrecompiled?.label ?? ''
})

watch(() => props.addressPrecompiled, (newVal) => {
    if (!newVal) return
    form.firstName = newVal.first_name ?? ''
    form.lastName = newVal.last_name ?? ''
    form.address = newVal.address ?? ''
    form.addressInfo = newVal.addressInfo ?? ''
    form.city = newVal.city ?? ''
    form.zip = newVal.zip ?? ''
    form.country = newVal.country ?? ''
    form.isPrimary = newVal.isPrimary ?? false
    form.label = newVal.label ?? ''
})

defineExpose({ form })
</script>
<style scoped>
.address-form {
    margin: 2rem auto;
}

label {
    color: #929393;
    font-size: 0.9rem;
    font-weight: bold;
}
</style>