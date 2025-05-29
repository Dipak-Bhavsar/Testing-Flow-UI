<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const aiRequestData = ref({
    id: generateUUID(),
    request: "",
});

watch(
    aiRequestData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    aiRequestData.value = window.valueJson[props.id] || { request: "" };
    console.log("Ai-Request id :", props.id);
});
</script>

<template>
    <div class="h-auto p-2 w-96 bg-white rounded-md shadow-lg border border-slate-200">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <p class="font-medium text-sm">AI Request</p>
            <button @click="removeNodes([props.id])" class="tex hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />
        <div class="flex flex-col gap-2 mt-2">
            <!-- Main Condition Block -->
            <div class="flex flex-col relative text-start">
                <textarea
                    v-model="aiRequestData.request"
                    type="text"
                    placeholder="write here "
                    class="h-20 p-1 border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg rounded-lg"></textarea>
            </div>
            <div class="flex justify-between items-center font-medium">
                <div class="">send</div>
                <Handle id="source-main" type="target" :position="Position.Left" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[146px] `" />
                <div>success()</div>
                <Handle :id="`target-http1-${nodeId}`" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[146px] `" />
            </div>
            <div class="flex justify-end">
                <div class="font-medium">Fail()</div>
                <Handle :id="`target-http2-${nodeId}`" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[170px] `" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.httpRight1-handle {
    width: 14px;
    height: 14px;
    top: 148px;
    right: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
.httpRight2-handle {
    width: 14px;
    height: 14px;
    top: 182px;
    right: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
.http-left {
    width: 14px;
    height: 14px;
    top: 149px;
    left: -3px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
</style>
