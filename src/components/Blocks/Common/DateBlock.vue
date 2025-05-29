<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const dateBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    dateBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    console.log("Date Block id : ", props.id);
});
</script>
<template>
    <div class="px-2 bg-white h-8 w-96 font-medium rounded-md flex justify-between items-center gap-2 border border-slate-200 shadow-lg">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p class="rounded-md px-1 border border-slate-200 h-8 size-6 flex items-center">
            <span class="text-base"><i class="hgi-stroke hgi-calendar-01"></i></span>
        </p>
        <input v-model="dateBlockData.condition" type="date" class="rounded-md h-7 w-full px-2 focus:outline outline-slate-900 hover:shadow-lg transition-all" />
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
