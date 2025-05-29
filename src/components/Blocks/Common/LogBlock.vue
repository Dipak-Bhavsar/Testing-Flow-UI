<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted } from "vue";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

onMounted(() => {
    console.log("Log Block id :", props.id);
});
</script>
<template>
    <div class="w-96 bg-white rounded-md flex justify-between items-center gap-2 h-8 px-2 shadow-lg border border-slate-200 font-medium">
        <!-- Header -->
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p class="border border-slate-200 h-8 rounded-md px-4 flex justify-center items-center">?</p>
        <p class="border border-slate-200 h-8 rounded-md px-4 flex justify-center items-center">Log</p>
        <p class="border border-slate-200 h-8 rounded-md px-4 flex justify-center items-center">></p>
        <Handle :id="'target-1' + id" type="target" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-3" />
    </div>
</template>
