<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const StringBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    StringBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    console.log("String Block id :", props.id);
});
</script>
<template>
    <!-- Header -->
    <div class="px-2 h-8 w-96 bg-white rounded flex justify-between items-center border border-slate-200 shadow-lg gap-2">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p class="font-medium">Aa</p>
        <input v-model="StringBlockData.condition" type="text" placeholder="Enter Text" class="w-full h-7 rounded-md px-2 focus:outline outline-slate-900" />
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
