<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();

const props = defineProps({
    id: String,
    data: Object,
});

const numberBlock = ref({
    id: generateUUID(),
    value: 0,
});
const count = ref(numberBlock.value.value); // Initialize counter

const increment = () => {
    count.value++;
    numberBlock.value.value = count.value;
};

const decrement = () => {
    if (count.value > 0) {
        count.value--;
        numberBlock.value.value = count.value;
    }
};

watch(count, () => {
    window.valueJSON = {
        id: props.id,
        NumberBlock: { ...numberBlock.value }, // Spread to ensure reactivity
    };
    console.log("Updated Value is :", window.valueJSON);
});

onMounted(() => {
    console.log("Number Block id : ", props.id);
});
</script>
<template>
    <div class="px-2 bg-white w-96 h-8 border border-slate-200 shadow-lg rounded-md flex justify-between items-center gap-1">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p class="font-medium">123</p>
        <input type="text" v-model="count" class="px-2 w-full rounded-md h-7 focus:outline outline-slate-900 hover:shadow-lg transition-all" placeholder="0" />
        <button type="button" class="rounded-md bg-slate-900 text-white px-1 h-8 hover:shadow-lg transition-all size-6" @click="decrement">
            <span class="text-base"><i class="hgi hgi-stroke hgi-minus-sign"></i></span>
        </button>
        <button type="button" class="rounded-md bg-slate-900 text-white px-1 h-8 hover:shadow-lg transition-all size-6" @click="increment">
            <span class="text-base"><i class="hgi hgi-stroke hgi-add-01"></i></span>
        </button>

        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
