<script setup lang="ts">
definePageMeta({
    layout: false
})

const route = useRoute()

type VerifyState = 'loading' | 'success' | 'error'

const state = ref<VerifyState>('loading')
const title = ref('Verifying your email')
const message = ref('We are confirming your address and preparing your account.')
const errorMessage = ref('')

onMounted(async () => {
    const token = route.query.token

    if (!token || typeof token !== 'string') {
        state.value = 'error'
        title.value = 'Invalid verification link'
        message.value = 'This link is missing a token or is not valid anymore.'
        return
    }

    try {
        await $fetch(`${useRuntimeConfig().public.API_BASE_URL}/auth/verify-email`, {
            method: 'POST',
            body: { token }
        })

        state.value = 'success'
        title.value = 'Email verified'
        message.value = 'Your email address has been confirmed successfully.'

        setTimeout(() => {
            navigateTo('/profile')
        }, 1400)
    } catch (error: any) {
        state.value = 'error'
        title.value = 'Verification failed'
        errorMessage.value =
            error?.data?.message ||
            'This verification link may have expired or has already been used.'
        message.value = 'Please request a new verification email and try again.'
    }
})
</script>

<template>
    <main class="verify-page">
        <div class="verify-shell">
            <section class="verify-card" aria-live="polite">
                <div class="brand-mark" aria-hidden="true">
                    <span class="brand-mark__ring"></span>
                    <span class="brand-mark__dot"></span>
                </div>

                <div class="status-block">
                    <div v-if="state === 'loading'" class="status-icon status-icon--loading" aria-hidden="true">
                        <span class="spinner"></span>
                    </div>

                    <div v-else-if="state === 'success'" class="status-icon status-icon--success" aria-hidden="true">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2.4" />
                        </svg>
                    </div>

                    <div v-else class="status-icon status-icon--error" aria-hidden="true">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M12 8v5" fill="none" stroke="currentColor" stroke-linecap="round"
                                stroke-width="2.4" />
                            <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
                            <path
                                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                                fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" />
                        </svg>
                    </div>

                    <p class="eyebrow">
                        {{
                            state === 'loading'
                                ? 'Email verification'
                                : state === 'success'
                                    ? 'Completed'
                                    : 'Action required'
                        }}
                    </p>

                    <h1>{{ title }}</h1>
                    <p class="lead">{{ message }}</p>

                    <p v-if="state === 'error' && errorMessage" class="error-copy">
                        {{ errorMessage }}
                    </p>
                </div>

                <div class="actions">
                    <NuxtLink v-if="state === 'success'" to="/profile" class="btn btn--primary">
                        Go to profile
                    </NuxtLink>

                    <NuxtLink v-if="state === 'error'" to="/login" class="btn btn--primary">
                        Back to login
                    </NuxtLink>

                    <NuxtLink v-if="state === 'error'" to="/resend-verification" class="btn btn--ghost">
                        Resend email
                    </NuxtLink>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
:global(:root) {
    --bg: #f7f6f2;
    --surface: #fbfbf9;
    --surface-2: #f1eee8;
    --border: rgba(40, 37, 29, 0.12);
    --text: #28251d;
    --muted: #73716b;
    --primary: #01696f;
    --primary-hover: #0c4e54;
    --success: #437a22;
    --success-bg: rgba(67, 122, 34, 0.1);
    --error: #a12c7b;
    --error-bg: rgba(161, 44, 123, 0.1);
    --shadow:
        0 1px 2px rgba(0, 0, 0, 0.04),
        0 20px 60px rgba(21, 20, 18, 0.08);
}

@media (prefers-color-scheme: dark) {
    :global(:root) {
        --bg: #171614;
        --surface: #1d1c1a;
        --surface-2: #252421;
        --border: rgba(255, 255, 255, 0.1);
        --text: #ece8e1;
        --muted: #9a978f;
        --primary: #4f98a3;
        --primary-hover: #68adb8;
        --success: #88bf62;
        --success-bg: rgba(136, 191, 98, 0.12);
        --error: #de79b3;
        --error-bg: rgba(222, 121, 179, 0.12);
        --shadow:
            0 1px 2px rgba(0, 0, 0, 0.24),
            0 24px 70px rgba(0, 0, 0, 0.34);
    }
}

.verify-page {
    min-height: 100dvh;
    background:
        radial-gradient(circle at top, rgba(1, 105, 111, 0.08), transparent 30%),
        var(--bg);
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.verify-shell {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding: 24px;
}

.verify-card {
    width: min(100%, 520px);
    padding: 32px;
    border: 1px solid var(--border);
    border-radius: 28px;
    background: linear-gradient(180deg, var(--surface), var(--surface-2));
    box-shadow: var(--shadow);
}

.brand-mark {
    width: 52px;
    height: 52px;
    margin-bottom: 28px;
    display: grid;
    place-items: center;
    position: relative;
}

.brand-mark__ring,
.brand-mark__dot {
    position: absolute;
    border-radius: 999px;
}

.brand-mark__ring {
    width: 52px;
    height: 52px;
    border: 1.5px solid rgba(1, 105, 111, 0.24);
}

.brand-mark__dot {
    width: 14px;
    height: 14px;
    background: var(--primary);
    box-shadow: 0 0 0 8px rgba(1, 105, 111, 0.08);
}

.status-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.status-icon {
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    margin-bottom: 8px;
}

.status-icon--loading {
    background: rgba(1, 105, 111, 0.08);
    color: var(--primary);
}

.status-icon--success {
    background: var(--success-bg);
    color: var(--success);
}

.status-icon--error {
    background: var(--error-bg);
    color: var(--error);
}

.spinner {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    border: 2.5px solid rgba(1, 105, 111, 0.18);
    border-top-color: currentColor;
    animation: spin 0.8s linear infinite;
}

.icon {
    width: 28px;
    height: 28px;
}

.eyebrow {
    font-size: 12px;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 700;
}

h1 {
    margin: 0;
    font-size: clamp(30px, 5vw, 40px);
    line-height: 1.05;
    letter-spacing: -0.03em;
}

.lead {
    margin: 0;
    font-size: 16px;
    line-height: 1.65;
    color: var(--muted);
    max-width: 38ch;
}

.error-copy {
    margin-top: 4px;
    padding: 14px 16px;
    border-radius: 16px;
    background: var(--error-bg);
    color: var(--error);
    font-size: 14px;
    line-height: 1.55;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
}

.btn {
    min-height: 44px;
    padding: 0 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: 180ms ease;
}

.btn--primary {
    background: var(--primary);
    color: white;
}

.btn--primary:hover {
    background: var(--primary-hover);
}

.btn--ghost {
    border: 1px solid var(--border);
    color: var(--text);
    background: transparent;
}

.btn--ghost:hover {
    background: rgba(127, 127, 127, 0.08);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 640px) {
    .verify-card {
        padding: 24px;
        border-radius: 24px;
    }

    .actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}
</style>