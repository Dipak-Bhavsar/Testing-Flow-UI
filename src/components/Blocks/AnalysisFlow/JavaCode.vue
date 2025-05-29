<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
const { removeNodes } = useVueFlow();

const props = defineProps({
    id: String,
    data: Object, // Prop received from VueFlow
});

const javaBlockData = ref({
    id: props.id,
});

const options = window.javaCodeEditorOptions;

const openCodeEditor = () => {
    window.javaCodeEditorOptions.value = {
        isJavaCodeEditor: true,
        value: "",
    };
};

onMounted(() => {
    javaBlockData.value = window.valueJson[props.id] || { inputs: [] };
});

watch(
    () => javaBlockData.value,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

// Initialize Global Reference on Mount
onMounted(() => {
    window.valueJSON = javaBlockData.value; // Set Global Reference
    console.log("Java code Block ID:", props.id);
});
const isZoomed = ref(false);
</script>
<template>
    <div class="h-auto p-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200">
        <!-- Header -->
        <Handle id="source-main" type="target" :position="Position.Left" :class="`!size-3 !bg-black !border-2 !border-slate-200 `" />
        <div class="h-8 w-full flex justify-between items-center">
            <p class="font-medium text-sm">Code Editor</p>
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />
        <!-- Container  -->
        <div class="flex flex-col gap-2 mt-2">
            <div class="flex justify-between items-center  gap-2">
                <label for="" class="font-medium">Name</label>
                <input type="text" class="border border-slate-200 rounded-md px-2 h-6 flex-1 focus:outline outline-slate-900 hover:shadow-lg transition-all">
            </div>
            <button @click="openCodeEditor" class="px-4 h-8 rounded-md bg-slate-900 text-white font-medium hover:shadow-lg transition-all">Open Code Editor</button>
        </div>
        <Handle :id="`target-http1-${nodeId}`" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200  `" />
    </div>
</template>
