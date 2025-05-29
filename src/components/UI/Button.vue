<script setup>
import { computed } from "vue";

const props = defineProps({
    type: {
        type: String,
        default: "primary", // "primary", "secondary", "primary-square", "secondary-square"
    },

    icon: {
        type: [String, Object], // Accepts an icon component or string
        default: null,
    },
    onClick: {
        type: Function,
        default: () => {},
    },
});

const isSquare = computed(() => props.type.toLowerCase().includes("square"));

const buttonClasses = computed(() => {
    const base = "flex items-center justify-center gap-2 transition-all hover:shadow-lg rounded-md font-medium transition-all";
    const size = isSquare.value ? "size-8" : "h-8 px-4";

    const styles = {
        primary: "bg-slate-900 text-white",
        secondary: "border border-slate-200 bg-white",
        "primary-square": "bg-slate-900 text-white",
        "secondary-square": "border border-slate-200 bg-white",
    };

    return `${base} ${size} ${styles[props.type]}`;
});
</script>

<template>
    <button :class="buttonClasses" @click="onClick">
        <span v-if="icon" class="font-semibold text-base mt-0.5"> <i :class="icon"></i></span>
        <slot></slot>
    </button>
</template>
