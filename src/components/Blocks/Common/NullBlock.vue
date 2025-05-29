<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const nullBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    nullBlockData,
    (newValues) => {
        window.valueJSON = {
            id: newValues.id,
            NullBlock: { ...newValues },
        };
        console.log("updated NullBlock values : ", window.valueJSON);
    },
    { deep: true }
);

onMounted(() => {
    console.log("Null Block id :", props.id);
});
</script>
<template>
    <div class="px-2 h-8 w-96 bg-white flex justify-between items-center gap-1 rounded-md border border-slate-200 shadow-lg font-medium">
        <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
            <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
        </button>
        <p v-bind="nullBlockData.value" class="flex items-center font-medium">Null</p>
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
