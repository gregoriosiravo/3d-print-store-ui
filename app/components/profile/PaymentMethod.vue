<template>
    <div class="d-flex mt-2">
        <h3 class="h5"><i class="bi bi-credit-card "></i> Payments</h3>
        <button class="add-payment-btn btn" @click="handleNewPayment(true)">add</button>
    </div>
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
            <span class="dots">•••• •••• •••• </span>
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
</template>

<script setup lang="ts">

const emit = defineEmits<{
    new: [openModal: boolean]
}>()

function handleNewPayment(openModal: boolean) {
    emit('new', openModal)
}

</script>

<style scoped>
/* Payment Section */
.add-payment-btn {
    font-size: small;
    color: white;
    max-width: 80%;
    text-align: center;
    margin-left: 18px;
    padding: 3px 10px 3px 10px;
    margin-bottom: 10px;
}

.add-payment-btn:hover {
    border: 1px solid #fff;
    background-color: #137fec;
    color: white;
}

.credit-card {
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
    margin: 0 auto;
    min-width: 100%;
    position: absolute;
    bottom: 80px;
    left: 24px;
    right: 24px;
    font-size: 20px;
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
        max-width: 310px;
        height: 180px;
        padding: 20px;
    }
}
</style>