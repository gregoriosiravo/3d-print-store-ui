<template>
    <div class="modal-backdrop fade show"></div>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Payment Method</h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <div id="payment-element"></div>
                    <div class="form-check mt-3">
                        <input id="defaultPayment" v-model="paymentMethod.isDefault" type="checkbox"
                            class="form-check-input">
                        <label class="form-check-label" for="defaultPayment">
                            Set as default payment method
                        </label>
                    </div>
                    <p v-if="stripeError" class="text-danger small mt-2">{{ stripeError }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" :disabled="loading" @click="$emit('close')">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" :disabled="loading" @click="handleSave">
                        {{ loading ? 'Saving...' : 'Save changes' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentMethodDto } from '~/types/payment';

const emit = defineEmits<{
    close: []
    save: []
}>()
const paymentStore = usePaymentStore()
const config = useRuntimeConfig()
const stripe = ref<any>(null)
const elements = ref<any>(null)
const stripeError = ref('')
const loading = ref(false)
const collectedPaymentMethodId = ref<string | null>(null)
const paymentMethod = reactive<PaymentMethodDto>({
    id: '',
    brand: null,
    last4: null,
    expMonth: null,
    expYear: null,
    isDefault: false,
    createdAt: new Date()
})

onMounted(async () => {
    try {
        const clientSecret = await paymentStore.createSetupIntent()
        stripe.value = await loadStripe(config.public.STRIPE_PUBLIC_KEY)
        elements.value = stripe.value.elements({ clientSecret })
        const paymentElement = elements.value.create('payment')
        paymentElement.mount('#payment-element')

        paymentElement.on('change', (event: any) => {
            stripeError.value = event.error ? event.error.message : ''
        })
    } catch (err) {
        stripeError.value = 'Failed to initialize payment form.'
        console.error('Setup intent failed:', err)
    }
})

const handleSave = async () => {
    if (!stripe.value || !elements.value) return
    loading.value = true
    stripeError.value = ''

    const { error: setupError, setupIntent } = await stripe.value.confirmSetup({
        elements: elements.value,
        redirect: 'if_required',
    })

    if (setupError) {
        stripeError.value = setupError.message
        loading.value = false
        return
    }

    if (!setupIntent?.payment_method) {
        stripeError.value = 'No payment method collected.'
        loading.value = false
        return
    }

    try {
        await paymentStore.savePaymentMethod(setupIntent.payment_method, paymentMethod.isDefault)
        emit('save')
    } catch (err) {
        stripeError.value = 'Failed to save payment method.'
    } finally {
        loading.value = false
    }
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

#payment-element {
    padding: 1rem 0;
}
</style>
