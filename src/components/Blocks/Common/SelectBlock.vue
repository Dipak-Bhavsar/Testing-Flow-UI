<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const selectBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    selectBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);
onMounted(() => {
    console.log("Select Block id :", props.id);
});
</script>
<template>
    <div class="px-2 h-8 w-96 bg-white rounded-md flex justify-between items-center gap-2 border border-slate-200 shadow-lg">
        <p class="flex justify-between items-center">
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
            <span class="rounded-md border border-slate-200 px-1 h-8 font-medium size-6 flex items-center"><i class="hgi-stroke hgi-sharp hgi-link-04"></i></span>
        </p>

        <input v-model="selectBlockData.condition" type="text" class="w-full font-medium p-1 focus:outline outline-slate-900 rounded-md h-7" placeholder="Enter path" />
        <p class="px-2 h-8 rounded-md border border-slate-200 flex items-center">?</p>
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
        <Handle :id="'target-1' + id" type="target" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
