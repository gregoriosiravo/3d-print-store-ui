<template>
    <UiContainer>
        <ProfileHeader></ProfileHeader>
        <div class="row">
            <div class="col-md-8">
                <h3 class="h5"><i class="bi bi-bag"></i> Recent Orders</h3>
                <div class="card bg-dark border-0 rounded-4 px-3 py-3">
                    <table class="table mb-0 align-middle text-white" data-bs-theme="dark">
                        <thead class="small text-secondary">
                            <tr>
                                <th>Item</th>
                                <th>Order Id</th>
                                <th>Status</th>
                                <th class="text-end">Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Turbo Fan Hub</td>
                                <td class="text-secondary">#ORD-2024-991</td>
                                <td>
                                    <span class="badge rounded-pill status-printing">PRINTING</span>
                                </td>
                                <td class="text-end fw-semibold">$42.50</td>
                                <td class="text-end">
                                    <i class="bi bi-three-dots-vertical action-dots"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Flexi‑Dragon Articulated</td>
                                <td class="text-secondary">#ORD-2024-884</td>
                                <td>
                                    <span class="badge rounded-pill status-shipped">SHIPPED</span>
                                </td>
                                <td class="text-end fw-semibold">$18.20</td>
                                <td class="text-end">
                                    <i class="bi bi-three-dots-vertical action-dots"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-4">
                <h3 class="h5"><i class="bi bi-truck "></i> Shipping</h3>
                <p>add new</p>
            </div>
        </div>
    </UiContainer>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "landing"
})
const userStore = useUserStore();

const isAuthenticated = computed(() => {
    userStore.isAuthenticated;
})

</script>

<style scoped>
.card.bg-dark {
    border: 2px solid #0f2036;
    border-radius: 10px;
    background-color: #101926;
}

.status-printing {
    color: #4aa3ff;
    background-color: rgba(74, 163, 255, 0.12);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
}

.status-shipped {
    color: #22c55e;
    background-color: rgba(34, 197, 94, 0.12);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
}

.action-dots {
    color: #6b7b93;
    cursor: pointer;
    transition: color 0.15s ease, transform 0.15s ease;
}

.action-dots:hover {
    color: #e6edf7;
    transform: scale(1.1);
}
</style>