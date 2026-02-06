<template>
    <UiContainer>

        <div class="container px-4 py-5">
            <div class="card p-4 p-md-5 mx-auto" style="max-width: 400px;">
                <form aria-label="Login form" @submit.prevent="handleLogin">
                    <h1 class="text-white pb-2">{{ title }}</h1>
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
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label text-white" for="exampleCheck1">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary d-block w-100">Login </button>
                </form>
                <div class="d-inline-flex flex-column mt-3 gap-2">
                    <button class="btn btn-link text-white" :style="!isLogin ? 'display: none;' : ''">Forgot
                        password?</button>
                    <button class="btn btn-link text-white " :style="!isLogin ? 'display: none;' : ''"
                        @click="handleRegister">Sign up</button>
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
    }
})
const user = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
})
const title = computed(() => (isLogin.value ? 'Welcome Back!' : 'Create Account!'));
const isLogin = ref(true);

async function handleLogin() {
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

function handleRegister() {
    isLogin.value = false;
}
</script>

<style scoped>
.card {
    border: 1px solid #dee2e6;
    background-color: #0d1c2e;
    border-radius: 0.375rem;
}
</style>