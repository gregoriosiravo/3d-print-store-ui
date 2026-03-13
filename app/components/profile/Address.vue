<template>
    <div class="d-flex">
        <h3 class="h5"><i class="bi bi-truck "></i> Shipping</h3>
        <button class="add-address-btn btn" @click="handleNewAddress(true)">add new</button>
    </div>

    <div class="card mb-2" v-for="(address, index) in addresses" :key="index">
        <div class="d-flex">
            <h2 class="paragraph mb-0"> {{ address.label || "Home" }}</h2>
            <span v-if="address.is_primary" class="badge rounded-pill default-address ">DEFAULT</span>
        </div>
        <p class="address mt-2"> {{ address.address }}, {{ address.city }}, {{ address.zip }}, {{ address.country }}</p>
        <div class="control-button ">
            <button class="btn btn-address" @click="handleEdit(address.id)">EDIT</button>
            <button class="btn btn-address ps-2" @click="handleDelete(address.id)">DELETE</button>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    addresses: Record<string, any>[]
}>()

const emit = defineEmits<{
    (event: 'edit'): void
    (event: 'delete'): void
    (event: 'new'): void
}>()

function handleEdit(addressId: string) {
    emit('edit', addressId)
}
function handleDelete(addressId: string) {
    emit('delete', addressId)
}
function handleNewAddress(openModal: boolean) {
    emit('new', openModal)
}
</script>

<style scoped>
/* SHipping section */
.add-address-btn {
    font-size: small;
    color: white;
    max-width: 80%;
    text-align: center;
    margin-left: 18px;
    padding: 4px;
}

.default-address {
    color: #fff;
    background-color: #137fec;
    font-size: 0.7rem;
    margin-left: 10px;
}

.paragraph {
    font-size: small;
    color: white;
}

.card {
    background-color: #0f1926;
    border: 2px solid #114b88;
    border-radius: 10px;
    padding: 10px;
}

.address {
    font-size: small;
    color: #606f86;
}

.btn-address {
    color: #909eb3;
    font-size: x-small;
    font-weight: bold;
    padding: 0;
}
</style>