<template>
    <UiContainer>
        <AddressModal v-if="openAddressModal" @close="openAddressModal = false" @save="handleSaveAddress"
            :addressPrecompiled="addressPrecompiled">
        </AddressModal>
        <PaymentModal v-if="openPaymentModal" @close="openPaymentModal = false" @save="handleSavePayment">
        </PaymentModal>
        <ProfileHeader :user="user!"></ProfileHeader>
        <div class="row mb-3">
            <div class="col-md-9">
                <Table :columns="['Item', 'Quote Id', 'Status', 'Amount', '']" tableName="Quotes History (7 days max)"
                    :items="quotes" type="quotes" @accept="handleAccept" @decline="handleDecline">
                </Table>
                <br>
                <Table :columns="['Item', 'Order Id', 'Status', 'Amount', '']" tableName="Order History" :items="orders"
                    type="orders" @accept="handlePay" @decline="handleCancelOrder">
                </Table>
            </div>
            <div class="col-md-3">
                <section id="shipping">
                    <Address :addresses="addresses" @edit="handleEditAddress" @delete="handleDeleteAddress"
                        @primary="handleSetPrimaryAddress" @new="handleOpenAddressModal">
                    </Address>
                </section>
                <section id="payment-info">
                    <PaymentMethod :payments="paymentStore.getUserPayments" @new="handleOpenPaymentModal"
                        @set-default="handleSetDefaultPayment" @delete="handleDeletePayment">
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
import PaymentModal from '~/components/profile/PaymentModal.vue';
import PaymentMethod from '~/components/profile/PaymentMethod.vue';
import type { AddressForm } from '~/types/address'
import type { PaymentMethodDto } from '~/types/payment'

definePageMeta({
    layout: "landing",
    middleware: ["auth"],
    ssr: false,
    keepalive: true
})
// The page is kept alive between visits, so its data is reloaded each time it is shown
onActivated(async () => {
    await quoteStore.fetchUserQuotes()
    await orderStore.fetchUserOrders()
    await addressStore.fetchUserAddresses(userStore.userId ?? '')
    await paymentStore.fetchUserPayments()
})
const userStore = useUserStore();
const quoteStore = useQuoteStore();
const orderStore = useOrderStore();
const addressStore = useAddressStore();
const paymentStore = usePaymentStore();

const openAddressModal = ref(false);
const openPaymentModal = ref(false);

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
    quoteStore.approveQuote(data.id);
}

const handleDecline = (data: any) => {
    console.log("Declining quote:", data)
    quoteStore.rejectQuote(data.id);
}

const handlePay = (data: any) => {
    console.log("Paying order:", data)
    navigateTo(`/checkout/${data.id}`)
}

const handleCancelOrder = async (data: any) => {
    const question = data.payment_status === 'paid'
        ? 'Cancel this order? The payment will be refunded.'
        : 'Cancel this order?'
    if (!confirm(question)) return
    await orderStore.cancelOrder(data.id)
    if (orderStore.error) alert(orderStore.error)
}

const handleEditAddress = (data: string) => {
    console.log("Editing address", data)
    addressId.value = data
    openAddressModal.value = !openAddressModal.value;
}
const handleDeleteAddress = (data: string) => {
    if (!user.value) return
    addressStore.deleteAddress(user.value.id, data)
}
const handleSetPrimaryAddress = (data: string) => {
    if (!user.value) return
    addressStore.setPrimaryAddress(user.value.id, data)
}
const handleOpenAddressModal = () => {
    console.log("Adding new address")
    addressId.value = null
    openAddressModal.value = !openAddressModal.value;
    console.log("Open address modal:", openAddressModal.value)
}

const handleOpenPaymentModal = () => {
    console.log("Adding new payment method")
    openPaymentModal.value = !openPaymentModal.value;

}

const handleSaveAddress = async (addressForm: AddressForm | null) => {
    console.log("Address ID:", addressId.value)
    if (!user.value) return;
    if (!addressId.value) await addressStore.addAddress(user.value?.id, addressForm)
    else await addressStore.editAddress(user.value?.id, addressId.value, addressForm)
    openAddressModal.value = false;

}

const handleSavePayment = () => {
    openPaymentModal.value = false
}

const handleSetDefaultPayment = (paymentMethodId: string) => {
    paymentStore.setDefaultPaymentMethod(paymentMethodId)
}

const handleDeletePayment = (paymentMethodId: string) => {
    paymentStore.deletePaymentMethod(paymentMethodId)
}
</script>

<style scoped>
#shipping {
    margin-bottom: 2rem;
}
</style>