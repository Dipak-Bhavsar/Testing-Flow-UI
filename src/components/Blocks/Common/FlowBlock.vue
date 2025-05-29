<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

const options = ref(["flow-1", "flow-2", "flow-3"]);
const selectedOption = ref("");

const collectBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    collectBlockData,
    (newValues) => {
        window.valueJSON[props.id] = newValues;
        console.log("Updated CollectBlock Value:", window.valueJSON);
    },
    { deep: true }
);

onMounted(() => {
    console.log("collect Block id : ", props.id);
});

// Emit event to parent
const emit = defineEmits(["removeNode"]);
// Function to Remove Node (emits event to parent)
const removeNode = () => {
    emit("removeNode", props.id);
};
</script>
<template>
    <div class="w-96 p-2 bg-white border border-slate-200 rounded-md shadow-lg">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <p v-bind="collectBlockData.value" class="font-medium text-sm">Flow-Block</p>
            <!-- <p class="w-full">FQL</p> -->
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />
        <div class="flex flex-col gap-2 mt-2">
            <select v-model="selectedOption" class="bg-white hover:shadow-lg border border-slate-200 h-8 px-2 focus:outline outline-slate-900 rounded-md transition-all w-full">
                <option disabled value="" class="font-medium">Select Flow</option>
                <option v-for="option in options" :key="option" :value="option" class="bg-white border border-slate-200 font-medium">
                    {{ option }}
                </option>
            </select>

            <div class="flex justify-between font-medium">
                <div>input</div>
                <div>success</div>
                <Handle :id="'target-1' + id" type="source" :position="Position.Left" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[98px] !-right-2.5`" />
                <Handle :id="'target-2' + id" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[98px] `" />
            </div>

            <div class="flex justify-end font-medium">
                <p>fail</p>
                <Handle :id="'target-3' + id" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !top-[121px] `" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.for-left {
    width: 14px;
    height: 14px;
    top: 103px;
    left: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
.for-right {
    width: 14px;
    height: 14px;
    top: 103px;
    right: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
.forStart-right {
    width: 14px;
    height: 14px;
    top: 147px;
    right: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
</style>
