<template>
    <div v-once class="coming-soon">
        <div class="content">
            <h1>Coming Soon</h1>
            <p>We're working hard to bring you something amazing.</p>
            <p class="note">Stay tuned for updates.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "landing"
})
</script>

<style scoped>
.coming-soon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
}

.content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.content p {
    font-size: 1.2rem;
    color: #9ca3af;
}

.note {
    margin-top: 0.5rem;
    font-size: 0.95rem;
    opacity: 0.7;
}
</style>
