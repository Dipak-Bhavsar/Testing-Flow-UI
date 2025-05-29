<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const httpBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    httpBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    console.log("HTTP Request Block id :", props.id);
});
</script>

<template>
    <div class="h-auto p-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <p class="font-medium text-sm">HTTP Request</p>
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />

        <div class="flex flex-col gap-2 mt-2">
            <!-- Main Condition Block -->
            <div class="flex flex-col relative text-start">
                <textarea v-model="httpBlockData.condition" type="text" placeholder="Find or create new request" class="h-20 p-2 rounded-md border border-slate-200 focus:outline outline-slate-900"></textarea>
            </div>
            <div class="flex justify-between">
                <span>send</span>
                <Handle id="source-main" type="source" :position="Position.Left" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[146px]`" />
                <span>success()</span>
                <Handle :id="`target-http2-${nodeId}`" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[146px]`" />
            </div>

            <div class="flex justify-end">
                <span>Fail()</span>
                <Handle :id="`target-http1-${nodeId}`" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[170px]`" />
            </div>
        </div>
    </div>
</template>
