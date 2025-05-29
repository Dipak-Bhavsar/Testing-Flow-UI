<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object, // Prop received from VueFlow
});
const options = ref(["String", "Bool", "Number", "Date", "Date & Time", "List", "Record", "any"]);

// Store Inputs

const inputBlockData = ref({
    id: props.id,
    inputs: [],
    type: "",
});

onMounted(() => {
    inputBlockData.value = window.valueJson[props.id] || { inputs: [] };
});

watch(
    () => inputBlockData.value,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

const addInput = () => {
    inputBlockData.value.inputs.push({
        value: "",
        type: "String",
    });
};

const removeInput = (index) => {
    if (index >= 0 && index < inputBlockData.value.inputs.length) {
        inputBlockData.value.inputs.splice(index, 1);
    } else {
        console.error("Invalid index:", index);
    }
};

// Initialize Global Reference on Mount
onMounted(() => {
    window.valueJSON = inputBlockData.value; // Set Global Reference
});
</script>

<template>
    <div class="w-96 bg-white rounded-md p-2 shadow-lg border border-slate-200">
        <!-- Remove Node Button -->
        <div class="text-sm px-2 h-8 text-start font-medium w-full border-slate-200 flex justify-between items-center ">
            {{ props.data.label }}
            <!-- <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all text-end">
                <span class="p-1"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button> -->
        </div>

        <hr />

        <!-- Dynamic Input Fields -->
        <div class="flex flex-col gap-2 mt-2">
            <div v-for="(input, index) in inputBlockData?.inputs" :key="index" class="rounded border border-white relative flex items-center">
                <!-- Input Handle -->
                <Handle :id="'target-' + index" type="source" :position="Position.Right" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-1.5`" />

                <div class="flex items-center relative gap-2 rounded-md w-full">
                    <input
                        type="text"
                        :placeholder="'Input ' + (index + 1)"
                        class="flex-1 max-w-40 px-2 h-8 rounded-md hover:shadow-lg transition-all border border-slate-200 focus:outline outline-slate-900"
                        v-model="input.value" />

                    <select v-model="input.type" class="flex-1 h-8 rounded-md hover:shadow-lg transition-all border border-slate-200 focus:outline outline-slate-900 bg-white">
                        <option v-for="option in options" :key="option" :value="option" class="bg-white rounded-md border border-slate-200 hover:shadow-lg transition-all">
                            {{ option }}
                        </option>
                    </select>
                    <!-- Remove Button -->
                    <button @click="removeInput(index)" class="hover:text-rose-500 transition-all size-6">
                        <span class="text-base font-medium"><i class="hgi-stroke hgi-delete-02"></i></span>
                    </button>
                </div>
            </div>

            <!-- Button to Add Inputs -->
            <div class="flex justify-start items-center">
                <button @click="addInput" class="px-4 flex items-center gap-1 h-8 rounded-md font-medium bg-slate-900 text-white hover:shadow-lg transition-all">
                    <span class=""><i class="hgi hgi-stroke hgi-add-01"></i></span> Add Input
                </button>
            </div>
        </div>
    </div>
</template>
