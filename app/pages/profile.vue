<template>
    <UiContainer>
        <AddressModal v-if="openAddressModal" @close="openAddressModal = false" @save="handleSaveAddress">
        </AddressModal>
        <ProfileHeader :user="user!"></ProfileHeader>
        <!-- Left Column -->
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
            <!-- Right Column -->
            <div class="col-md-3">
                <section id="shipping">
                    <Address :addresses="addresses" @edit="handleEditAddress" @delete="handleDeleteAddress"
                        @new="handleOpenAddressModal">
                    </Address>
                </section>
                <section id="payment-info">
                </section>
            </div>
        </div>

    </UiContainer>
</template>

<script setup lang="ts">
import Table from '~/components/profile/Table.vue';
import Address from '~/components/profile/Address.vue';
import AddressModal from '~/components/profile/AddressModal.vue';

definePageMeta({
    layout: "landing",
    middleware: ["auth"]
})
onMounted(async () => {
    await quoteStore.fetchUserQuotes()
    console.log("Fetched user quotes:", quoteStore.getUserQuotes)
    await orderStore.fetchUserOrders()
    console.log("Fetched user orders:", orderStore.getUserOrders)
    await addressStore.fetchUserAddresses(userStore.userId)
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
}
const handleDeleteAddress = (data: string) => {
    console.log("Deleting address")
}
const handleOpenAddressModal = () => {
    console.log("Adding new address")
    openAddressModal.value = !openAddressModal.value;
    console.log("Open address modal:", openAddressModal.value)
}
const handleSaveAddress = async (addressForm: InstanceType<typeof AddressForm> | null) => {
    console.log("Saving address")
    console.log("Address form data:", addressForm)
    await addressStore.addAddress(user.value?.id, addressForm)
    openAddressModal.value = false;

}
</script>

<style scoped></style>