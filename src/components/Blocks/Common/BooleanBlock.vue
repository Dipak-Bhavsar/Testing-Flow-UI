<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const booleanBlock = ref(false);

watch(booleanBlock, (newValues) => {
    window.valueJson[props.id] = newValues;
});

onMounted(() => {
    booleanBlock.value = window.valueJson[props.id] || {};
    console.log("Boolean Block id :", props.id);
});
</script>
<template>
    <div class="px-2 h-8 w-96 bg-white rounded-md border border-slate-200 shadow-lg flex justify-between items-center gap-1">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p class="flex justify-between items-center font-medium rounded-md h-8 px-4">Bool</p>
        <!-- <button type="submit" class="p-1 w-full bg-gray-800 text-white">true</button> -->
        <button @click="booleanBlock = !booleanBlock" class="w-full rounded-md h-7 px-4 bg-slate-900 text-white hover:shadow-lg">
            {{ booleanBlock ? "True" : "False" }}
        </button>
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
