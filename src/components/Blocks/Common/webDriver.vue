<script setup>
import { Handle, Position } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
    id: String,
    data: Object, // Prop received from VueFlow
});

const webDriverBlockData = ref({
    id: props.id,
    selectBrowser: "",
    selectVersion: "",
});

watch(
    () => webDriverBlockData.value,
    (newValues) => {
        if (!window.valueJson) window.valueJson = {};
        window.valueJson[props.id] = { ...newValues };
    },
    { deep: true }
);

// Initialize Global Reference on Mount
onMounted(() => {
    webDriverBlockData.value = window.valueJson?.[props.id] || {
        id: props.id,
        selectBrowser: "",
        selectVersion: "",
    };
});
</script>

<template>
    <div class="w-96 bg-white rounded-md p-2 shadow-lg border border-slate-200">
        <!-- Remove Node Button -->
        <div class="text-sm px-2 h-8 text-start font-medium w-full border-slate-200 flex items-center">
            <!-- <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all">
                <span class="p-1"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button> -->
            {{ props.data.label }}
        </div>
        <hr />
        <div class="mt-2 flex justify-between items-center gap-2">
            <select v-model="webDriverBlockData.selectBrowser" name="" id="" class="border border-slate-200 rounded-md flex-1 focus:outline outline-slate-900 hover:shadow-lg transition-all py-1 px-2">
                <option value="">Select Browser</option>
                <option value="Chrome">Chrome</option>
                <option value="Opera">Opera</option>
                <option value="Firefox">Firefox</option>
                <option value="MicrosoftEdge">Microsoft Edge</option>
            </select>
            <select v-model="webDriverBlockData.selectVersion" name="" id="" class="border border-slate-200 rounded-md flex-1 focus:outline outline-slate-900 hover:shadow-lg transition-all py-1 px-2">
                <option value="">Select Version</option>
                <option value="114">114</option>
                <option value="115">115</option>
                <option value="116">116</option>
                <option value="117">117</option>
            </select>
        </div>

        <Handle :id="'target-' + index" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute`" />
    </div>
</template>
