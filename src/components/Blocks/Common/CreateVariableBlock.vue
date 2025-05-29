<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const createVariableBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    createVariableBlockData,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);
onMounted(() => {
    console.log("create Variable id :", props.id);
});
</script>
<template>
    <div class="px-2 h-8 bg-white font-medium border border-slate-200 shadow w-96 rounded-md flex items-center gap-2">
        <div>
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <input v-model="createVariableBlockData.condition" type="text" placeholder="Variable 1" class="focus:outline outline-slate-900 h-7 px-2 w-full rounded-md" />

        <p class="rounded-md border border-slate-200 px-1 h-8 flex items-center">img</p>
        <Handle :id="'source' + id" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
