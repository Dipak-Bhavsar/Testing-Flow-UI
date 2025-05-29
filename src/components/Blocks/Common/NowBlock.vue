<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted } from "vue";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

onMounted(() => {
    console.log("Now Block id : ", props.id);
});
</script>
<template>
    <div class="bg-white px-2 w-96 h-8 font-medium rounded-md border border-slate-200 shadow-lg flex justify-between items-center gap-1">
        <div class="flex justify-start items-center gap-2">
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="font-medium text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
            <p class="rounded-md border border-slate-200 px-1 h-8 flex items-center">img</p>
        </div>

        <p type="button" class="rounded-md font-medium">Now</p>
        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
