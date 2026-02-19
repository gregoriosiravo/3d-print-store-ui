<template>
    <UiContainer>
        <ProfileHeader></ProfileHeader>
        <!-- Left Column -->
        <div class="row mb-3">
            <div class="col-md-8">
                <h3 class="h5"><i class="bi bi-bag"></i> Recent Orders</h3>
                <div class="card bg-dark border-0 rounded-4 pb-3">
                    <table class="table mb-0 align-middle text-white" data-bs-theme="dark" data-bs-table-bg="none">
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
            <!-- Right Column -->
            <div class="col-md-4">
                <section id="shipping">
                    <div class="d-flex">
                        <h3 class="h5"><i class="bi bi-truck "></i> Shipping</h3>
                        <p class="ps-4">add new</p>
                    </div>
                    <!-- TODO: ADD FOREACH FOR ADDRESSES -->
                    <div class="card">
                        <div class="d-flex">
                            <h2 class="paragraph mb-0"> Office (workspace)</h2>
                            <span class="badge rounded-pill default-address ms-4">DEFAULT</span>
                        </div>
                        <p class="address mt-2"> via valsesia 12, Roma, RM, 00142</p>
                        <div class="control-button ">
                            <button class="btn btn-address">EDIT</button>
                            <button class="btn btn-address ps-2">DELETE</button>
                        </div>
                    </div>
                </section>
                <section id="payment-info">
                    <div class="d-flex mt-2">
                        <h3 class="h5"><i class="bi bi-credit-card "></i> Payments</h3>
                        <p class="ps-4">ADD</p>
                    </div>
                    <div class="credit-card-container p-0">
                        <div class="credit-card">
                            <!-- Chip -->
                            <div class="chip">
                                <i class="bi bi-credit-card-fill"></i> <!-- or use SVG -->
                            </div>

                            <!-- VISA logo -->
                            <div class="visa-logo">
                                VISA
                            </div>

                            <!-- Card number (dotted + last 4) -->
                            <div class="card-number">
                                <span class="dots">•••• •••• ••••</span>
                                <span class="last-four">4242</span>
                            </div>

                            <!-- Labels & values -->
                            <div class="card-details">
                                <div class="detail-group">
                                    <small class="label">CARD HOLDER</small>
                                    <div class="value">ALEX STERLING</div>
                                </div>
                                <div class="detail-group">
                                    <small class="label">EXPIRES</small>
                                    <div class="value">09/26</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>


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
thead {
    background-color: #0f1c2e !important;
    border-radius: 10px !important;
}

.table[data-bs-theme="dark"] {
    --bs-table-bg: transparent;
    /* remove Bootstrap table background [web:2] */
    --bs-table-border-color: transparent;
    color: #e6edf7;
}

.table[data-bs-theme="dark"]> :not(caption)>*>* {
    background-color: transparent !important;
    /* cells same as card [web:23] */
    box-shadow: none;
}

.card.bg-dark {
    border: 2px solid #0f2036 !important;
    border-radius: 10px;
    background-color: #0f1926 !important;
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

/* SHipping section */
.default-address {
    color: #fff;
    background-color: #137fec;
    font-size: 0.7rem;
}

.paragraph {
    font-size: small;
    color: white;
}

.card {
    background-color: #0f1926;
    border: 2px solid #114b88;
    border-radius: 10px;
    padding: 10px;
}

.address {
    font-size: small;
    color: #606f86;
}

.btn-address {
    color: #909eb3;
    font-size: x-small;
    font-weight: bold;
    padding: 0;
}

/* Payment Section */
.credit-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: linear-gradient(135deg, #0f1926 0%, #1a2535 100%);
    padding: 2rem;
}

.credit-card {
    width: 340px;
    height: 220px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow: hidden;
}

/* Chip */
.chip {
    width: 48px;
    height: 32px;
    background: linear-gradient(145deg, #f0f0f0 0%, #e0e0e0 100%);
    border-radius: 6px;
    position: absolute;
    top: 24px;
    left: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.chip i {
    color: #333;
    font-size: 14px;
}

/* VISA logo */
.visa-logo {
    position: absolute;
    top: 24px;
    right: 24px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Card number */
.card-number {
    position: absolute;
    bottom: 60px;
    left: 24px;
    right: 24px;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.dots {
    color: rgba(255, 255, 255, 0.3);
}

.last-four {
    color: rgba(255, 255, 255, 0.95);
}

/* Bottom labels */
.card-details {
    position: absolute;
    bottom: 24px;
    left: 24px;
    right: 24px;
    display: flex;
    justify-content: space-between;
}

.detail-group {
    flex: 1;
}

.label {
    display: block;
    color: rgba(255, 255, 255, 0.4);
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.value {
    color: rgba(255, 255, 255, 0.95);
    font-size: 16px;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 576px) {
    .credit-card {
        width: 100%;
        max-width: 300px;
        height: 180px;
        padding: 20px;
    }
}
</style>