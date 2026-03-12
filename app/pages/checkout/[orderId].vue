<template>
    <UiContainer>
        <div v-if="!paymentSuccess" class="row align-items-start">
            <div class="col-md-5">
                <AddressForm ref="addressForm" />
            </div>
            <div class="col-md-7">
                <div id="payment-element" class="form-control custom-width"></div>
                <p v-if="error" class="text-danger text-center">{{ error }}</p>
                <div class="text-center mb-4">
                    <button @click="handlePay" :disabled="loading" class="btn btn-primary margin">
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

definePageMeta({ layout: "landing", middleware: ["auth"] })

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

onMounted(async () => {
    try {
        const data = await $fetch<{ clientSecret: string }>(
            `${config.public.API_BASE_URL}/orders/${orderId}/pay`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
            }
        )
        clientSecret.value = data.clientSecret
        stripe.value = await loadStripe(config.public.STRIPE_PUBLIC_KEY)
        elements.value = stripe.value.elements({ clientSecret: clientSecret.value })
        elements.value.create('payment').mount('#payment-element')
    } catch (err) {
        console.error('Checkout init failed:', err)
    }
})

const handlePay = async () => {
    loading.value = true
    error.value = ''
    console.log("Submitting payment for order:", orderId)
    console.log("Address form data:", addressForm.value?.form)
    try {
        await $fetch(`${config.public.API_BASE_URL}/orders/${orderId}/address`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${useCookie('auth_token').value}` },
            body: addressForm.value?.form
        })
    } catch (err) {
        error.value = 'Failed to save address. Please try again.'
        loading.value = false
        return
    }

    // 2. Confirm payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: {
            return_url: `${window.location.origin}/orders/${orderId}/success`
        },
        redirect: 'if_required'
    })

    if (stripeError) {
        error.value = stripeError.message
        loading.value = false
    } else if (paymentIntent?.status === 'succeeded') {
        paymentSuccess.value = true
        loading.value = false
    }
}
</script>


<style scoped>
.custom-width {
    margin: 2rem auto;
}

.margin {
    margin: 0 auto;
}
</style>
