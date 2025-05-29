<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { defineEmits, defineProps, onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const emit = defineEmits(["remove"]); // ✅ Define the event emitter

const isEditing = ref(false);

const startEditing = () => {
    isEditing.value = true;
};
const stopEditing = () => {
    isEditing.value = false;
    // Ensure the change is reflected in the node's data
    props.data.collectLabel = collectBlockData.value.collectLabel;

    // (Optional) Update global cache if you're still using it
    if (!window.valueJSON) window.valueJSON = {};
    window.valueJSON[props.id] = { ...collectBlockData.value };
};

const collectBlockData = ref({
    id: generateUUID(),
    collectLabel: "Collect",
});
watch(
    collectBlockData,
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
        collectBlockData.value = {
            ...collectBlockData.value,
            ...saved,
        };
    } else if (props.data.collectLabel) {
        // fallback to node data
        collectBlockData.value.collectLabel = props.data.collectLabel;
    }
});
</script>

<template>
    <div class="w-96 p-2 bg-white rounded-md border border-slate-200 shadow-lg">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <div class=" ">
                <p class="font-medium text-sm flex item-center gap-2" v-if="!isEditing" @dblclick="startEditing">
                    {{ collectBlockData.collectLabel }}
                    <span class="">
                        <i class="hgi hgi-stroke hgi-pencil-edit-02"></i>
                    </span>
                </p>

                <input
                    v-else
                    v-model="collectBlockData.collectLabel"
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
                <div>? Item</div>
                <div>List []</div>

                <Handle :id="'target-1' + id" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-3 !top-[58px]" />
                <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[58px]" />
            </div>

            <div class="flex justify-end font-medium">
                <p>Finish</p>
                <Handle :id="'target-3' + id" type="target" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[82px]" />
            </div>
        </div>
    </div>
</template>
