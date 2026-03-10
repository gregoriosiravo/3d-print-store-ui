<template>

    <h3 class="h5"><i class="bi bi-bag"></i> {{ props.tableName }}</h3>
    <div class="card bg-dark border-0 rounded-4 pb-3">
        <table class="table mb-0 align-middle text-white" data-bs-theme="dark" data-bs-table-bg="none">
            <thead class="small text-secondary">
                <tr>
                    <th v-for="column in props.columns">{{ column }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.stl_filename }}</td>
                    <td class="text-secondary">{{ type == 'quotes' ? '#QUOTE-' + item.id : '#ORDER-' + item.id }}</td>
                    <td>
                        <span class="badge rounded-pill status-printing">{{ item.status }}</span>
                    </td>
                    <td class="text-end fw-semibold">{{ item.total_price }}</td>
                    <td class="text-end">
                        <i class="bi bi-three-dots-vertical action-dots"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Quote } from '~/types/quote'

const props = defineProps<{
    tableName: string
    type: string
    columns: string[]
    items: Record<string, any>[]
}>()
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