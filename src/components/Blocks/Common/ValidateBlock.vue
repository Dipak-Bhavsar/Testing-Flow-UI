<script setup>
import { onMounted, ref, watch } from "vue";
import { Handle, Position, useVueFlow } from "@vue-flow/core";
const { removeNodes } = useVueFlow();
// Props received from the parent
const props = defineProps({
    id: String,
    data: Object,
});

const validateBlockData = ref({
    id: props.id,
    value: "",
});

watch(
    validateBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    validateBlockData.value = window.valueJson[props.id] || { value: "" };
    console.log("Ai-Request id :", props.id);
});

const label = ref(props.data.label);

const isEditable = ref(false);

const showBlock = ref(false);

const toggleBlock = () => {
    showBlock.value = !showBlock.value;
};

const enableEdit = () => {
    isEditable.value = true;
};

const disableEdit = () => {
    isEditable.value = false;
};
</script>

<template>
    <div :class="showBlock ? 'bg-white h-auto w-96 p-2 border border-slate-200 shadow-lg rounded-md font-medium  ' : 'bg-white h-28 font-medium w-48 p-2 border border-slate-200 shadow-lg rounded-md'">
        <!-- Header with list button -->
        <div class="flex items-center h-8">
            <!-- Editable Label with double-click -->
            <div @dblclick="enableEdit">
                <span class="flex items-center gap-2" v-if="!isEditable">{{ label }} <i class="hgi hgi-stroke hgi-pencil-edit-02"></i></span>
                <input
                    v-if="isEditable"
                    v-model="label"
                    class="w-24 border border-slate-200 hover:shadow-lg rounded-md px-2 h-8 focus:outline outline-slate-900"
                    @blur="disableEdit"
                    @keyup.enter="disableEdit" />
            </div>
            <div class="flex justify-end items-center w-full gap-2">
                <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                    <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
                </button>
                <div @click="toggleBlock" class="hover:text-rose-500 cursor-pointer size-6">
                    <span class="text-base"><i class="hgi hgi-stroke hgi-sharp hgi-arrow-right-01"></i></span>
                </div>
            </div>
        </div>
        <hr />

        <div class="flex flex-col gap-2 mt-2">
            <div class="flex justify-between">
                <div>? data</div>
                <div>pass ?</div>
                <!-- <Handle :id="'target-' + index" type="source" :position="Position.Right" class="absolute size-4 rounded-full"
                 style="background-color: orange; width: 14px; height: 14px; border-radius: 50%; border: 2px solid black; position: absolute; right: px" /> -->
            </div>
            <div class="flex justify-end">
                <div>fail()</div>
            </div>
        </div>

        <!-- Conditional display of options -->
        <div v-if="showBlock" class="grid grid-row-3 text-center p-5 m-1">
            <div>
                <div class="">Select an option to add a schema</div>
            </div>
            <div class="flex justify-center m-1">
                <button class="bg-white border border-slate-200 hover:shadow-lg transition-all px-4 h-8 rounded-md">Generate from example</button>
            </div>
            <div class="flex justify-center">
                <button class="bg-white border border-slate-200 hover:shadow-lg transition-all px-4 h-8 rounded-md">Define custom schema</button>
            </div>
        </div>
    </div>
</template>
