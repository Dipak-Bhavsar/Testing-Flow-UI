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
    // Ensure the change is reflected in the node's data
    props.data.forLabel = forBlockData.value.forLabel;

    // (Optional) Update global cache if you're still using it
    if (!window.valueJSON) window.valueJSON = {};
    window.valueJSON[props.id] = { ...forBlockData.value };
};

const forBlockData = ref({
    id: generateUUID(),
    forLabel: "For",
});

watch(
    forBlockData,
    (newValues) => {
        if (!window.valueJSON) window.valueJSON = {};
        window.valueJSON[props.id] = { ...newValues };
        console.log("✅ Updated ForBlock Value:", window.valueJSON);
    },
    { deep: true }
);

onMounted(() => {
    const saved = window.valueJSON?.[props.id];
    if (saved) {
        forBlockData.value = {
            ...forBlockData.value,
            ...saved,
        };
    } else if (props.data.forLabel) {
        // fallback to node data
        forBlockData.value.forLabel = props.data.forLabel;
    }
});

const showSelect = ref(false);
</script>
<template>
    <div class="w-96 p-2 bg-white rounded-md border border-slate-200 shadow-lg">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <div class=" ">
                <p class="font-medium text-sm flex item-center gap-2" v-if="!isEditing" @dblclick="startEditing">
                    {{ forBlockData.forLabel }}
                    <span class="">
                        <i class="hgi hgi-stroke hgi-pencil-edit-02"></i>
                    </span>
                </p>

                <input v-else v-model="forBlockData.forLabel" @blur="stopEditing" @keyup.enter="stopEditing" class="rounded-md border border-slate-200 focus:outline outline-slate-900 px-2 py-1" />
            </div>
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
            <!-- <p class="w-full">FQL</p> -->
        </div>
        <hr />
        <div class="flex flex-col gap-2 mt-2">
            <div class="flex justify-between font-medium">
                <div>[] List</div>
                <div>Item ?</div>

                <Handle :id="'target-1' + id" type="source  " :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-3 !top-[58px]" />
                <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[58px]" />
            </div>

            <div class="flex justify-start font-medium">
                <p>Start</p>
                <Handle :id="'target-2' + id" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-3 !top-[82px]" />
            </div>
        </div>
    </div>
</template>
