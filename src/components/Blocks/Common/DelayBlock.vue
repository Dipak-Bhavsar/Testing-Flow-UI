<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();

const props = defineProps({
    id: String,
    data: Object,
});
// Delay Block State
const delayBlock = ref({
    id: generateUUID(),
    value: 0, // Default value set to 0
});

// Bind `count` to `delayBlock.value`
const count = ref(delayBlock.value.value);

const increment = () => {
    count.value++;
    delayBlock.value.value = count.value; // Update delayBlock value
};
const decrement = () => {
    if (count.value > 0) {
        count.value--;
        delayBlock.value.value = count.value; // Update delayBlock value
    }
};

// Watch `count` changes & update `window.valueJSON`
watch(count, (newValue) => {
    window.valueJSON = {
        id: props.id,
        DelayBlock: { ...delayBlock.value }, // Spread to ensure reactivity
    };
    console.log("Updated Value is :", window.valueJSON);
});

onMounted(() => {
    console.log("Delay Block : ", props.id);
});
</script>
<template>
    <div class="flex justify-between items-center w-96 h-8 rounded-md gap-1 border border-slate-200 shadow-lg bg-white px-2">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <div class="rounded-md font-medium flex items-center">Delay</div>
        <input type="text" v-model="count" placeholder="0" class="px-2 focus:outline outline-slate-900 h-7 rounded-md" />
        <button type="button" class="px-1 rounded-md bg-slate-900 text-white h-8 hover:shadow-lg size-6" @click="decrement">
            <span class="text-base"><i class="hgi hgi-stroke hgi-minus-sign"></i></span>
        </button>
        <button type="button" class="px-1 rounded-md bg-slate-900 text-white h-8 hover:shadow-lg size-6" @click="increment">
            <span class="text-base"><i class="hgi hgi-stroke hgi-add-01"></i></span>
        </button>
        <div class="px-1">ms</div>

        <Handle id="source-1" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute" />
        <Handle id="source-2" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute" />
    </div>
</template>
