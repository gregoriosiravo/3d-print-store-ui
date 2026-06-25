<template>
    <UiContainer>
        <AddressModal v-if="openAddressModal" @close="openAddressModal = false" @save="handleSaveAddress"
            :addressPrecompiled="addressPrecompiled">
        </AddressModal>
        <ProfileHeader :user="user!"></ProfileHeader>
        <div class="row mb-3">
            <div class="col-md-9">
                <Table :columns="['Item', 'Quote Id', 'Status', 'Amount', '']" tableName="Quotes History (7 days max)"
                    :items="quotes" type="quotes" @accept="handleAccept" @decline="handleDecline">
                </Table>
                <br>
                <Table :columns="['Item', 'Order Id', 'Status', 'Amount', '']" tableName="Order History" :items="orders"
                    type="orders" @accept="handlePay" @decline="handleDelete">
                </Table>
            </div>
            <div class="col-md-3">
                <section id="shipping">
                    <Address :addresses="addresses" @edit="handleEditAddress" @delete="handleDeleteAddress"
                        @new="handleOpenAddressModal">
                    </Address>
                </section>
                <section id="payment-info">
                    <PaymentMethod>
                    </PaymentMethod>
                </section>
            </div>
        </div>

    </UiContainer>
</template>

<script setup lang="ts">
import Table from '~/components/profile/Table.vue';
import Address from '~/components/profile/Address.vue';
import AddressModal from '~/components/profile/AddressModal.vue';
import PaymentMethod from '~/components/profile/PaymentMethod.vue';
import type { AddressForm } from '~/types/address'

definePageMeta({
    layout: "landing",
    middleware: ["auth"],
    ssr: false
})
onMounted(async () => {
    await quoteStore.fetchUserQuotes()
    console.log("Fetched user quotes:", quoteStore.getUserQuotes)
    await orderStore.fetchUserOrders()
    console.log("Fetched user orders:", orderStore.getUserOrders)
    await addressStore.fetchUserAddresses(userStore.userId ?? '')
    console.log("Fetched user addresses:", addressStore.getUserAddresses)
})
const userStore = useUserStore();
const quoteStore = useQuoteStore();
const orderStore = useOrderStore();
const addressStore = useAddressStore();

const openAddressModal = ref(false);

const user = computed(() => userStore.user);
const quotes = computed(() => quoteStore.getUserQuotes)
const orders = computed(() => orderStore.getUserOrders)
const addresses = computed(() => addressStore.getUserAddresses)
const addressId = ref<string | null>(null)
const addressPrecompiled = computed(() => {
    if (!addressId.value) return null
    return addressStore.getUserAddresses.find((addr: Record<string, any>) => addr.id === addressId.value) ?? null
})

// Handlers for quote and order actions
const handleAccept = (data: any) => {
    console.log("Accepting quote:", data)
    quoteStore.approveQuote(data.id, data.total_price);
}

const handleDecline = (data: any) => {
    console.log("Declining quote:", data)
    quoteStore.rejectQuote(data.id);
}

const handlePay = (data: any) => {
    console.log("Paying order:", data)
    navigateTo(`/checkout/${data.id}`)
}

const handleDelete = (data: any) => {
    console.log("Deleting order:", data)
    //orderStore.deleteOrder(data.id);
}

const handleEditAddress = (data: string) => {
    console.log("Editing address", data)
    addressId.value = data
    openAddressModal.value = !openAddressModal.value;
}
const handleDeleteAddress = (data: string) => {
    console.log("Deleting address")
}
const handleOpenAddressModal = () => {
    console.log("Adding new address")
    addressId.value = null
    openAddressModal.value = !openAddressModal.value;
    console.log("Open address modal:", openAddressModal.value)
}
const handleSaveAddress = async (addressForm: AddressForm | null) => {
    console.log("Address ID:", addressId.value)
    if (!user.value) return;
    if (!addressId.value) await addressStore.addAddress(user.value?.id, addressForm)
    else await addressStore.editAddress(user.value?.id, addressId.value, addressForm)
    openAddressModal.value = false;

}
</script>

<style scoped></style>