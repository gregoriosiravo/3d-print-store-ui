<template>
    <div class="col-md-9">
        <h3 class="h5"><i class="bi bi-bag"></i> {{ props.tableName }}</h3>
        <div class="card bg-dark border-0 rounded-4 pb-3">
            <table class="table mb-0 align-middle text-white" data-bs-theme="dark" data-bs-table-bg="none">
                <thead class="small text-secondary">
                    <tr>
                        <th v-for="column in props.columns">{{ column }}</th>
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
</template>

<script setup lang="ts">

const props = defineProps({
    tableName: String,
    columns: Array,
    items: Object
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
</style>