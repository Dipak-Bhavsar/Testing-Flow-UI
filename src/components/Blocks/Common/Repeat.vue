<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const isEditing = ref(false);

const startEditing = () => {
    isEditing.value = true;
};
const stopEditing = () => {
    isEditing.value = false;
    props.data.repeatLabel = repeatBlockData.value.repeatLabel;
    if (!window.valueJSON) window.valueJSON = {};
    window.valueJSON[props.id] = { ...repeatBlockData.value };
};

const repeatBlockData = ref({
    id: generateUUID(),
    repeatLabel: "Repeat",
});

watch(
    repeatBlockData,
    (newValues) => {
        if (!window.valueJSON) window.valueJSON = {};
        window.valueJSON[props.id] = { ...newValues };
    },
    { deep: true }
);

onMounted(() => {
    const saved = window.valueJSON?.[props.id];
    if (saved) {
        repeatBlockData.value = {
            ...repeatBlockData.value,
            ...saved,
        };
    } else if (props.data.repeatLabel) {
        // fallback to node data
        repeatBlockData.value.repeatLabel = props.data.repeatLabel;
    }
});
</script>
<template>
    <div class="h-auto w-96 p-2 bg-white rounded-md border border-slate-200 shadow-lg">
        <!-- Header -->
        <div class="h-8 flex justify-between items-center">
            <div class=" ">
                <p class="font-medium text-sm flex item-center gap-2" v-if="!isEditing" @dblclick="startEditing">
                    {{ repeatBlockData.repeatLabel }}
                    <span class="">
                        <i class="hgi hgi-stroke hgi-pencil-edit-02"></i>
                    </span>
                </p>

                <input
                    v-else
                    v-model="repeatBlockData.repeatLabel"
                    @blur="stopEditing"
                    @keyup.enter="stopEditing"
                    class="rounded-md border border-slate-200 focus:outline outline-slate-900 px-2 py-1" />
            </div>

            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
            <!-- <p class="w-full">FQL</p> -->
        </div>
        <hr />
        <div class="flex flex-col gap-2 mt-2">
            <div class="flex justify-between font-medium">
                <div>123 count</div>
                <div>Index 123</div>
                <Handle :id="'target-1' + id" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-3 !top-[56px]" />
                <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !top-[58px]" />
            </div>

            <div class="flex justify-start font-medium">
                <p>Start</p>
                <Handle :id="'target-2' + id" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !top-[82px]" />
            </div>
        </div>
    </div>
</template>
