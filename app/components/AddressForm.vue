<template>
    <form class="address-form card p-4 mb-4">
        <div class="form-group">
            <label for="inputName">Name</label>
            <input v-model="form.name" type="text" class="form-control" id="inputName" placeholder="John">
        </div>
        <div class="form-group">
            <label for="inputSurname">Surname</label>
            <input v-model="form.surname" type="text" class="form-control" id="inputSurname" placeholder="Doe">
        </div>
        <div class="form-group">
            <label for="inputAddress">Address</label>
            <input v-model="form.address" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
        </div>
        <div class="form-group">
            <label for="inputAddress2">Address 2</label>
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
        </div>
    </form>
</template>

<script setup lang="ts">
interface AddressForm {
    name: string
    surname: string
    address: string
    addressInfo: string
    city: string
    zip: string
    country: string
}

const form = reactive<AddressForm>({
    name: '',
    surname: '',
    address: '',
    addressInfo: '',
    city: '',
    country: '',
    zip: ''
})

defineExpose({ form }) 
</script>

<style scoped>
.address-form {
    margin: 2rem auto;
}
</style>