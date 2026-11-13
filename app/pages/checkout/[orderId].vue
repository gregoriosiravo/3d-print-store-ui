<template>
    <UiContainer>
        <div v-if="!paymentSuccess" class="row align-items-start">
            <div class="col-md-5">
                <AddressForm ref="addressForm" :addressPrecompiled="addressPrecompiled" :isCheckout="true" />
            </div>
            <div class="col-md-7">
                <div class="custom-width">
                    <label for="payCard" class="form-label text-uppercase text-secondary small fw-semibold">Pay with</label>
                    <select id="payCard" v-model="selectedCard" class="form-select form-select-dark" data-testid="pay-with">
                        <option v-for="card in savedCards" :key="card.id" :value="card.id">
                            {{ (card.brand ?? 'Card').toUpperCase() }} •••• {{ card.last4 }}{{ card.isDefault ? ' (default)' : '' }}
                        </option>
                        <option value="new">Use a new card</option>
                    </select>
                </div>
                <div v-show="selectedCard === 'new'" id="payment-element" class="form-control custom-width"></div>
                <p v-if="error" class="text-danger text-center">{{ error }}</p>
                <div class="text-center mb-4">
                    <button @click="handlePay" :disabled="loading || !stripe" class="btn btn-primary margin">
                        {{ loading ? 'Processing...' : 'Pay Now' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="text-center" style="padding: 3rem">
            <div style="font-size: 4rem">🎉</div>
            <h2>Payment succeeded!</h2>
            <p class="text-muted">Thanks for your order — the printer is already working for you!</p>
            <NuxtLink to="/profile" class="btn btn-primary mt-3">View your orders</NuxtLink>
        </div>
    </UiContainer>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import AddressForm from '~/components/AddressForm.vue'
import type { PaymentMethodDto } from '~/types/payment'

definePageMeta({ layout: "landing", middleware: ["auth"], ssr: false })


const config = useRuntimeConfig()
const route = useRoute()
const orderId = route.params.orderId as string

const addressForm = ref<InstanceType<typeof AddressForm> | null>(null)

const clientSecret = ref<string | null>(null)
const stripe = ref<any>(null)
const elements = ref<any>(null)
const loading = ref(false)
const error = ref('')
const paymentSuccess = ref(false)
const addressStore = useAddressStore();
const userStore = useUserStore();
const paymentStore = usePaymentStore();

// Saved cards; the default one is preselected, or a new card when there are none
const savedCards = computed<PaymentMethodDto[]>(() => paymentStore.getUserPayments)
const selectedCard = ref<string>('new')

const addressPrecompiled = computed(() => {
    const addresses = addressStore.getUserAddresses
    return addresses.length > 0 ? addresses[0] : null
})
onMounted(async () => {
    // Back from a 3-D Secure redirect: Stripe puts the outcome in the URL
    if (route.query.redirect_status === 'succeeded') {
        await recordPayment()
        return
    }
    try {
        const data = await $fetch<{ clientSecret: string }>(
            `${config.public.API_BASE_URL}/orders/${orderId}/pay`,
            {
              credentials: "include",
              method: 'POST',
            }
        )
        clientSecret.value = data.clientSecret
        stripe.value = await loadStripe(config.public.STRIPE_PUBLIC_KEY)
        elements.value = stripe.value.elements({ clientSecret: clientSecret.value })
        elements.value.create('payment').mount('#payment-element')
        // Saved cards load in the background; the default one is preselected when they arrive
        await paymentStore.fetchUserPayments()
        const defaultCard = savedCards.value.find((card) => card.isDefault)
        selectedCard.value = defaultCard ? defaultCard.id : 'new'
    } catch (err: any) {
        // The API refuses to start a second payment for a paid order: show the success view
        if (err?.data?.error === 'Order is already paid') {
            paymentSuccess.value = true
        } else {
            console.error('Checkout init failed:', err)
            error.value = 'The payment could not be started. Reload the page to try again.'
        }
    }
    try {
        await addressStore.fetchUserAddresses(userStore.userId)
        console.log("Fetched user addresses:", addressStore.getUserAddresses)
    } catch (error) {
        console.error('Failed to fetch address details:', error)
    }
})

// Asks the API to check the payment with Stripe and mark the order paid
const recordPayment = async () => {
    try {
        await $fetch(`${config.public.API_BASE_URL}/orders/${orderId}/confirm-payment`, {
            method: 'POST',
            credentials: 'include',
        })
    } catch (err) {
        console.error('Payment confirmation failed:', err)
    }
    paymentSuccess.value = true
}

const handlePay = async () => {
    if (!stripe.value) return
    loading.value = true
    error.value = ''
    console.log("Submitting payment for order:", orderId)
    console.log("Address form data:", addressForm.value?.form)
    try {
        await $fetch(`${config.public.API_BASE_URL}/orders/${orderId}/address`, {
          credentials: "include",
            method: 'PATCH',
            body: addressForm.value?.form
        })
    } catch (err) {
        error.value = 'Failed to save address. Please try again.'
        loading.value = false
        return
    }

    const savedCard = savedCards.value.find((card) => card.id === selectedCard.value)
    const outcome = savedCard
        // A saved card is confirmed with its Stripe reference; the Payment Element is not used
        ? await stripe.value.confirmCardPayment(clientSecret.value, {
            payment_method: savedCard.stripePaymentMethodId,
        })
        : await stripe.value.confirmPayment({
            elements: elements.value,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/${orderId}`
            },
            redirect: 'if_required'
        })
    const stripeError = outcome.error
    const paymentIntent = outcome.paymentIntent

    if (stripeError) {
        error.value = stripeError.message
        loading.value = false
    } else if (paymentIntent?.status === 'succeeded') {
        await recordPayment()
        loading.value = false
    }
}
</script>


<style scoped>
.custom-width {
    margin: 2rem auto;
}

.form-select-dark {
    background-color: #1a2942;
    border: none;
    color: #e5e7eb;
}

.margin {
    margin: 0 auto;
}
</style>
