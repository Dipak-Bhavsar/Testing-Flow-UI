<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const displayBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    displayBlockData,
    (newValues) => {
        window.valueJSON[props.id] = newValues;
        console.log("Updated DisplayBlock Value:", window.valueJSON);
    },
    { deep: true }
);

onMounted(() => {
    console.log("Display Block id :", props.id);
});
const selectedOption = ref("");

const options = ref(["Auto Detect", "Text", "Number", "Boolean", "Date & Time", "Json", "Bar Chart", "Line Chart", "Gauge", "Table", "Mark Down", "HTML", "URL", "Image", "Video", "You Tube"]);
</script>

<template>
    <div class="h-auto w-96 p-2 bg-white rounded-md border border-slate-200 shadow-lg flex flex-col gap-2">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <p v-bind="displayBlockData.value" class="font-medium">Display</p>
            <div class="flex justify-end items-center gap-2">
                <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                    <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
                </button>

                <!-- Custom Select Wrapper -->
                <select v-model="selectedOption" class="rounded-md h-8 border border-slate-200 focus:outline outline-slate-900">
                    <option value="" disabled class="font-medium">Choose Type</option>
                    <option v-for="option in options" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
            </div>
        </div>
        <hr />

        <div class="flex flex-col gap-2 mt-2">
            <div class="flex justify-center items-center">
                <p class="w-full p-8 font-medium text-center">Connect Block to see data</p>
            </div>
        </div>

        <Handle :id="'target-1' + id" type="target" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-3" />
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
