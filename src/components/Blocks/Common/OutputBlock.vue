<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
const { removeNodes } = useVueFlow();
// Define props
const props = defineProps({
    id: String,
    data: Object, // Prop received from VueFlow
});

const options = ref(["String", "Bool", "Number", "Null", "Select", "Now", "Date", "Date & Time", "List", "Record", "Get Variable"]);

// Store Outputs
const outputBlockData = ref({
    id: props.id,
    outputs: [], // Initialize outputs as an empty array
});

watch(
    () => outputBlockData.value,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    outputBlockData.value = window.valueJson[props.id] || { outputs: [] };
});
// Add new output block
const addOutput = () => {
    outputBlockData.value.outputs.push({
        value: "", // Default value for new output
        type: "String", // Default type (can be changed later)
        // editing: false,
        key: "Value", // Default label
    });
};

// Remove output block by index
const removeOutput = (index) => {
    if (index >= 0 && index < outputBlockData.value.outputs.length) {
        outputBlockData.value.outputs.splice(index, 1);
    } else {
        console.error("Invalid index:", index);
    }
};
const editing = ref(null);
</script>

<template>
    <div class="w-96 bg-white border border-slate-200 p-2 rounded-md shadow-lg">
        <!-- Node Label -->
        <div class="flex justify-between items-center font-medium border-slate-100 h-8">
            {{ props.data.label }}
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />

        <div class="flex flex-col gap-2 mt-2">
            <!-- Output Blocks -->
            <div v-for="(output, index) in outputBlockData?.outputs" :key="index" class="flex gap-2 mt-1 items-center justify-between h-8 rounded-md transition-all relative">
                <!-- Right Handle (Dynamically generated) -->
                <Handle :id="`handle-${props.id}-${index}`" type="source" :position="Position.Left" :class="`!size-3 !bg-black !border-2 !border-slate-200 !absolute !-left-1.5`" />
                <!-- Editable Label -->
                <div
                    class="w-full flex items-center justify-center h-8 rounded-md font-medium border border-slate-200 hover:shadow-lg transition-all focus:outline outline-slate-900 bg-white"
                    @dblclick="output.editing = true">
                    <!-- Show input when editing, otherwise show text -->
                    <template v-if="output.editing">
                        <input
                            type="text"
                            v-model="output.key"
                            @blur="output.editing = false"
                            @keyup.enter="output.editing = false"
                            class="px-1 h-8 rounded-md font-medium hover:shadow-lg transition-all focus:outline outline-slate-900 bg-white" />
                    </template>
                    <template v-else>
                        {{ output.key || "Value" }}
                    </template>
                </div>

                <!-- Dropdown to select block type -->
                <select v-model="output.type" class="bg-white w-full border px-4 h-8 border-slate-200 hover:shadow-lg focus:outline outline-slate-900 rounded-md">
                    <option v-for="option in options" :key="option" :value="option" class="bg-white border border-slate-200 hover:shadow-lg transition-all rounded-md">
                        {{ option }}
                    </option>
                </select>
                <!-- Input for value -->
                <input
                    v-model="output.value"
                    type="text"
                    class="flex items-center w-full px-4 h-8 rounded-md border border-slate-200 hover:shadow-lg focus:outline outline-slate-900"
                    placeholder="Enter text " />

                <!-- Remove Button -->
                <button @click="removeOutput(index)" class="hover:text-rose-500 transition-all size-6">
                    <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
                </button>
            </div>

            <!-- Button to Add Outputs -->
            <div class="flex justify-start items-center">
                <button @click="addOutput" class="px-4 h-8 flex items-center gap-1 rounded-md font-medium bg-slate-900 text-white hover:shadow-lg transition-all">
                    <span class=""><i class="hgi hgi-stroke hgi-add-01"></i></span> Add Output
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-handle {
    width: 14px;
    height: 14px;
    top: 18px;
    left: -10px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: rgb(238, 142, 17);
}
</style>
