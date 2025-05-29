<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { ref, watch } from "vue";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object, // Prop received from VueFlow
});

// Create reactive local copies of data.inputs and data.outputs
const inputs = ref([...props.data.inputs]);
const outputs = ref([...props.data.outputs]);

// Watch for prop updates and sync
watch(
    () => props.data.inputs,
    (newInputs) => {
        inputs.value = [...newInputs];
    }
);
watch(
    () => props.data.outputs,
    (newOutputs) => {
        outputs.value = [...newOutputs];
    }
);

// Function to add an input field dynamically
const addInput = () => {
    const newInputIndex = inputs.value.length; // Get the next index
    inputs.value.push(`Input ${newInputIndex + 1}`);
};

// Function to add an output field dynamically
const addOutput = () => {
    outputs.value.push(`Output ${outputs.value.length + 1}`);
};

// Function to remove an input field
const removeInput = (index) => {
    inputs.value.splice(index, 1); // Remove the input at the specified index
};

// Function to remove an output field
const removeOutput = (index) => {
    outputs.value.splice(index, 1);
};
</script>

<template>
    <div class="border-l-8 border-orange-500 bg-gray-900 rounded-xl shadow-lg p-2 resize-container">
        <!-- Node Label -->
        <div class="text-lg text-start font-medium text-white border-b-2 border-slate-500 p-2">
            {{ props.data.label }}
        </div>

        <!-- Dynamic Input Fields -->
        <div
            v-for="(input, index) in inputs"
            :key="'input-' + index"
            class="rounded-lg border-2 border-white m-2 relative flex items-center"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null">
            <!-- Input Handle -->
            <Handle
                :id="'target-' + index"
                type="target"
                :position="Position.Left"
                class="absolute left-10 size-4 rounded-full"
                style="background-color: orange; width: 14px; height: 14px; border-radius: 50%; border: 2px solid black; position: absolute; left: -22px" />

            <!-- Input Box with Remove Button Inside -->
            <div class="flex items-center w-full relative">
                <input type="text" :placeholder="'Input ' + (index + 1)" class="text-white w-full p-2 pr-8 bg-transparent border-b border-white focus:outline-none" v-model="inputs[index]" />
                <!-- Remove Button inside input box -->
                <button @click="removeInput(index)" class="absolute right-2 hover:text-rose-500 transition-all rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="16" height="16" viewBox="0 0 29 29" fill="currentColor">
                        <path
                            d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8 8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z"></path>
                        <path
                            d="M26 8H3a1 1 0 1 1 0-2h23a1 1 0 1 1 0 2zM14.5 23a1 1 0 0 1-1-1V11a1 1 0 1 1 2 0v11a1 1 0 0 1-1 1zM10.999 23a1 1 0 0 1-.995-.91l-1-11a1 1 0 0 1 .905-1.086 1.003 1.003 0 0 1 1.087.906l1 11a1 1 0 0 1-.997 1.09zM18.001 23a1 1 0 0 1-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 0 1 .905 1.086l-1 11a1 1 0 0 1-.995.91z"></path>
                        <path d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Dynamic Output Fields -->
        <div v-for="(output, index) in outputs" :key="'output-' + index" class="rounded-lg border-2 border-white m-2 relative flex items-center">
            <!-- Output Box with Remove Button Inside -->
            <div class="flex items-center w-full relative">
                <input type="text" :placeholder="'Output ' + (index + 1)" class="text-white w-full p-2 pr-8 bg-transparent border-b border-white focus:outline-none" v-model="outputs[index]" />
                <!-- Remove Button inside output box -->

                <button @click="removeOutput(index)" class="absolute right-2 hover:text-rose-500 transition-all rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="16" height="16" viewBox="0 0 29 29" fill="currentColor">
                        <path
                            d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8 8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z"></path>
                        <path
                            d="M26 8H3a1 1 0 1 1 0-2h23a1 1 0 1 1 0 2zM14.5 23a1 1 0 0 1-1-1V11a1 1 0 1 1 2 0v11a1 1 0 0 1-1 1zM10.999 23a1 1 0 0 1-.995-.91l-1-11a1 1 0 0 1 .905-1.086 1.003 1.003 0 0 1 1.087.906l1 11a1 1 0 0 1-.997 1.09zM18.001 23a1 1 0 0 1-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 0 1 .905 1.086l-1 11a1 1 0 0 1-.995.91z"></path>
                        <path d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z"></path>
                    </svg>
                </button>
            </div>
            <!-- Output Handle -->
            <Handle :id="'source-' + index" type="source" :position="Position.Right" class="custom-handle bg-white" />
        </div>

        <!-- Buttons to Add Inputs and Outputs -->
        <div class="flex justify-between m-2">
            <button @click="addInput" class="text-white px-2 py-1 rounded border border-white m-1">+ Add Input</button>
            <button @click="addOutput" class="text-white px-2 py-1 rounded border border-white m-1">+ Add Output</button>
        </div>
    </div>
</template>

<style scoped>
.custom-handle {
    width: 14px;
    height: 14px;
    right: -18px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: orange;
}

/* Adjust handle positions */
[data-handle^="target-"] {
    left: -22px;
    top: 50%;
    transform: translateY(-50%);
}
[data-handle^="source-"] {
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
}
</style>
