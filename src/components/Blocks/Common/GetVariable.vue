<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const createVariableBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    createVariableBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);
onMounted(() => {
    console.log("create Variable id :", props.id);
});
</script>
<template>
    <div class="px-2 h-8 bg-white font-medium w-96 border border-slate-200 shadow-lg rounded-md flex justify-end items-center gap-2">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p class="rounded-md border border-slate-200 h-8 flex items-center px-1">img</p>

        <select name="" id="" class="px-2 rounded-md h-7 focus:outline outline-slate-900 flex-1">
            <option value="" disabled selected>Select Variable</option>
        </select>
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
<style scoped>
.variable-left {
    width: 14px;
    height: 14px;

    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
</style>
