<!-- components/Ui/Input.vue -->
<template>
    <input :type="type" class="btn-check" :name="name" :id="id" :autocomplete="autocomplete" :checked="checked">
    <label :class="labelClass" :for="labelFor || id" :style="labelStyle" :aria-label="ariaLabel">
        <slot></slot>
    </label>
</template>

<script lang="ts" setup>
const props = defineProps({
    // Input props
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'radio'
    },
    name: {
        type: String,
        required: true
    },
    autocomplete: {
        type: String,
        default: 'off'
    },
    checked: {
        type: Boolean,
        default: false
    },

    // Label props
    labelClass: {
        type: String,
        default: ''
    },
    labelFor: {
        type: String,
        default: ''
    },
    labelStyle: {
        type: String,
        default: ''
    },
    ariaLabel: {
        type: String,
        default: ''
    }
})
</script>


<style scoped>
/* Layer Height Buttons */
.btn-check:checked+.btn-layer {
    background-color: #374151;
    color: #ffffff;
}

/* Material Cards */
.btn-check:checked+.material-card {
    border-color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
}

/* Layer Height Buttons */
.btn-check:checked+.btn-layer {
    background-color: #374151;
    color: #ffffff;
}

.color-swatch {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    display: block;
}

.color-swatch:hover,
.color-swatch:focus {
    transform: scale(1.05);
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* Color Swatches */
.btn-check:checked+.color-swatch {
    border-color: #ffffff;
    transform: scale(1.1);
}

/* Layer Height Buttons */
.btn-check:checked+.btn-layer {
    background-color: #374151;
    color: #ffffff;
}

.btn-layer {
    background-color: #1a2942;
    border: 1px solid #1a2942;
    color: #9ca3af;
    padding: 0.5rem 0.75rem;
    transition: all 0.2s;
    font-size: 0.875rem;
}

@media (min-width: 768px) {
    .btn-layer {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
}

.btn-layer:hover,
.btn-layer:focus {
    background-color: #374151;
    color: #ffffff;
}

/* Material Cards */
.btn-check:checked+.material-card {
    border-color: #3b82f6;
    background-color: rgba(59, 130, 246, 0.1);
}

.material-card {
    background-color: #0a1628;
    border: 2px solid #374151;
    border-radius: 0.75rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    display: block;
}

.material-card:hover,
.material-card:focus {
    border-color: #4b5563;
}
</style>