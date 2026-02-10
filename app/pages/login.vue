<template>
    <UiContainer>
        <div class="container px-4 py-5">
            <div class="card p-4 p-md-5 mx-auto" style="max-width: 400px;">
                <form aria-label="Login form" @submit.prevent="isLogin ? handleLogin() : handleRegister()">
                    <h1 class="text-white pb-2">{{ title }}</h1>
                    <div class="mb-3" v-if="!isLogin">
                        <label for="firstName" class="form-label text-white">First name</label>
                        <input type="text" class="form-control" id="firstName" v-model="user.firstName">
                        <div class="text-danger small mt-1" v-if="validationErrors.firstName.error">{{
                            validationErrors.firstName.value }}</div>
                    </div>
                    <div class="mb-3" v-if="!isLogin">
                        <label for="lastName" class="form-label text-white">Last name</label>
                        <input type="text" class="form-control" id="lastName" v-model="user.lastName">
                        <div class="text-danger small mt-1" v-if="validationErrors.lastName.error">{{
                            validationErrors.lastName.value }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="emailAddress" class="form-label text-white">Email address</label>
                        <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp"
                            v-model="user.email">
                        <div class="text-danger small mt-1" v-if="validationErrors.email.error">{{
                            validationErrors.email.value }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label text-white">Password</label>
                        <input type="password" class="form-control" id="password" v-model="user.password">
                        <div class="text-danger small mt-1" v-if="validationErrors.password.error">{{
                            validationErrors.password.value }}</div>
                    </div>
                    <div class="mb-3" v-if="!isLogin">
                        <label for="confirmPassword" class="form-label text-white">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="user.confirmPassword">
                        <div class="text-danger small mt-1" v-if="validationErrors.confirmPassword.error">{{
                            validationErrors.confirmPassword.value }}</div>
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
    </UiContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
const store = useUserStore()
definePageMeta({
    layout: "landing"
})
const validationErrors = reactive({
    email: {
        value: '',
        error: false
    },
    password: {
        value: '',
        error: false
    },
    firstName: {
        value: '',
        error: false
    },
    lastName: {
        value: '',
        error: false
    },
    confirmPassword: {
        value: '',
        error: false
    }
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

const handleLogin = async () => {
    // basic validation logic
    if (!user.email || !user.password) {
        validationErrors.email.value = !user.email ? 'Email is required' : '';
        validationErrors.email.error = !user.email;
        validationErrors.password.value = !user.password ? 'Password is required' : '';
        validationErrors.password.error = !user.password;
        return;
    }
    await store.login(user.email, user.password);
}



const switchToRegister = () => {
    isLogin.value = false;
}
const handleRegister = async () => {
    if (isLogin.value) return;
    console.log('Registering user:', user.firstName, user.lastName, user.email);
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
        validationErrors.firstName.value = !user.firstName ? 'First name is required' : '';
        validationErrors.firstName.error = !user.firstName;
        validationErrors.lastName.value = !user.lastName ? 'Last name is required' : '';
        validationErrors.lastName.error = !user.lastName;
        validationErrors.email.value = !user.email ? 'Email is required' : '';
        validationErrors.email.error = !user.email;
        validationErrors.password.value = !user.password ? 'Password is required' : '';
        validationErrors.password.error = !user.password;
        return;
    }
    if (user.password.length < 6 || user.password != user.confirmPassword) {
        validationErrors.password.value = 'Password must be at least 6 characters and match confirmation';
        validationErrors.password.error = true;
        return;
    }
    await store.registerUser(user.firstName, user.lastName, user.email, user.password);
}
</script>

<style scoped>
.card {
    border: 1px solid #dee2e6;
    background-color: #0d1c2e;
    border-radius: 0.375rem;
}
</style>