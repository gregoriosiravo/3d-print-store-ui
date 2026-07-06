<template>
    <UiContainer>
        <div class="container px-4 py-5">
            <div class="card p-4 p-md-5 mx-auto" style="max-width: 400px;">
                <form aria-label="Login form" @submit.prevent="isLogin ? handleLogin() : handleRegister()">
                    <h1 class="text-white pb-2">{{ title }}</h1>
                    <div class="mb-3" v-if="!isLogin">
                        <label for="firstName" class="form-label text-white">First name</label>
                        <input type="text" class="form-control" id="firstName" v-model="user.firstName">
                        <div class="text-danger small mt-1" v-if="errors.firstName">{{ errors.firstName }}</div>
                    </div>
                    <div class="mb-3" v-if="!isLogin">
                        <label for="lastName" class="form-label text-white">Last name</label>
                        <input type="text" class="form-control" id="lastName" v-model="user.lastName">
                        <div class="text-danger small mt-1" v-if="errors.lastName">{{ errors.lastName }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="emailAddress" class="form-label text-white">Email address</label>
                        <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp"
                            v-model="user.email">
                        <div class="text-danger small mt-1" v-if="errors.email">{{ errors.email }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label text-white">Password</label>
                        <input type="password" class="form-control" id="password" v-model="user.password">
                        <div class="text-danger small mt-1" v-if="errors.password">{{ errors.password }}</div>
                    </div>
                    <div class="mb-3" v-if="!isLogin">
                        <label for="confirmPassword" class="form-label text-white">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="user.confirmPassword">
                        <div class="text-danger small mt-1" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label text-white" for="rememberMe">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary d-block w-100"
                        :aria-label="isLogin ? 'Login' : 'Register'">{{ isLogin ? 'Login' : 'Register'
                        }}</button>
                </form>
                <div class="d-inline-flex flex-column mt-3 gap-2">
                    <button class="btn btn-link text-white" aria-label="Reset Password"
                        :style="!isLogin ? 'display: none;' : ''">Forgot
                        password?</button>
                    <button class="btn btn-link text-white " aria-label="Sign up for a new account"
                        :style="!isLogin ? 'display: none;' : ''" @click="switchToRegister">Sign up</button>
                </div>

            </div>
        </div>
        <Modal v-if="openModal" title="Error"
            message="There was an error processing your request. Please try again later." @close="openModal = false">
        </Modal>
    </UiContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
const route = useRoute()
const quoteStore = useQuoteStore()
const { login, register, userId, fetchUser } = useAuth()
const { errors, validate, clearErrors } = useFormValidation()
definePageMeta({
    layout: "landing"
})
const user = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
})
const title = computed(() => (isLogin.value ? 'Welcome Back!' : 'Create Account!'));
const isLogin = ref(true);
const openModal = ref(false);

const handleLogin = async () => {
    clearErrors()
    const valid = validate({
        email: { value: user.email, rules: [{ type: 'required' }] },
        password: { value: user.password, rules: [{ type: 'required' }] },
    })
    if (!valid) return

    try {
        await login(user.email, user.password)

        const action = route.query.action
        const quoteId = route.query.quoteId

        if (action === 'save-quote' && quoteId && userId.value) {
            await quoteStore.associateQuoteWithUser(userId.value, quoteId as string)
        }
        await fetchUser()

        const redirectPath = (route.query.redirect as string) || '/profile'
        await navigateTo(redirectPath)
    } catch (error) {
        errors.password = 'Invalid email or password'
        openModal.value = true
    }
}

const switchToRegister = () => {
    clearErrors()
    isLogin.value = false;
}
const handleRegister = async () => {
    if (isLogin.value) return;
    clearErrors()
    const valid = validate({
        firstName: { value: user.firstName, rules: [{ type: 'required' }] },
        lastName: { value: user.lastName, rules: [{ type: 'required' }] },
        email: { value: user.email, rules: [{ type: 'required' }] },
        password: { value: user.password, rules: [{ type: 'required' }, { type: 'minLength', value: 6 }] },
        confirmPassword: { value: user.confirmPassword, rules: [{ type: 'required' }, { type: 'match', value: user.password, message: 'Passwords do not match' }] },
    })
    if (!valid) return

    try {
        await register(user.firstName, user.lastName, user.email, user.password)
        await fetchUser()
        const action = route.query.action
        const quoteId = route.query.quoteId

        if (action === 'save-quote' && quoteId) {
            await quoteStore.associateQuoteWithUser(userId.value ?? "", quoteId as string)
        }

        const redirectPath = (route.query.redirect as string) || '/profile'
        await navigateTo(redirectPath)
    } catch (error) {
        console.error('Registration failed:', error)
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #dee2e6;
    background-color: #0d1c2e;
    border-radius: 0.375rem;
}
</style>