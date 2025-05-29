<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();

// Define dropdown options
const options = ["String", "Bool", "Number", "Null", "Select", "Now", "Date", "Date&Time", "Json", "getVariable"];
const selectLang = ref(["FQL", "typeScript"]);

const props = defineProps({
    id: String,
    data: Object,
});

const showSelect = ref(false);
const selectedLanguage = ref("javascript");

const toggleBoolean = (block) => {
    block.value = !block.value;
};
const conditionalBlockData = ref({
    variables: [],
    conditions: [],
});

const conditionTitle = ref("Condition");

console.log("Title Value:", conditionalBlockData.conditionTitle);

// Function to add a new block dynamically
const addBlock = (option) => {
    if (!option) return;
    conditionalBlockData.value.variables.push({
        id: generateUUID(),
        key: "untitled",
        type: option,
        value: "",
    });
    showSelect.value = false;
};

// Function to remove a block
const removeBlock = (blockId) => {
    conditionalBlockData.value.variables = conditionalBlockData.value.variables.filter((block) => block.id !== blockId);
};

// Function to add a condition block dynamically
const addCondition = () => {
    conditionalBlockData.value.conditions.push({
        id: generateUUID(),
        value: "",
    });
};

// Function to remove a specific condition block
const removeCondition = (index) => {
    conditionalBlockData.value.conditions.splice(index, 1);
};

// edit title
const isEditing = ref(false);

function startEditing() {
    isEditing.value = true;
}

function stopEditing() {
    isEditing.value = false;
}

// Watch for changes and update the global object
// watch(
//     conditionalBlockData,
//     (newValues) => {
//         window.valueJson[props.id] = newValues;
//     },
//     { deep: true }
// );

watch(
    [conditionalBlockData, conditionTitle],
    ([newConditionalData, newConditionTitle]) => {
        if (!window.valueJson) window.valueJson = {};
        window.valueJson[props.id] = {
            ...newConditionalData,
            conditionTitle: newConditionTitle,
        };
    },
    { deep: true }
);

// Initialize data when component is mounted
onMounted(() => {
    if (window.valueJson && window.valueJson[props.id]) {
        const saved = window.valueJson[props.id];
        if (saved.variables) conditionalBlockData.value.variables = saved.variables;
        if (saved.conditions) conditionalBlockData.value.conditions = saved.conditions;
        if (saved.conditionTitle) conditionTitle.value = saved.conditionTitle;
    }
});
</script>

<template>
    <div class="h-auto p-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <div>
                <p class="font-medium text-sm flex items-center gap-2" v-if="!isEditing" @dblclick="startEditing">
                    {{ conditionTitle }}
                    <span class="text-md size-4">
                        <i class="hgi hgi-stroke hgi-pencil-edit-02"></i>
                    </span>
                </p>

                <input v-else v-model="conditionTitle" @blur="stopEditing" @keyup.enter="stopEditing" class="rounded-md border border-slate-200 focus:outline outline-slate-900 px-2 py-1" />
            </div>

            <div class="flex justify-end items-center gap-1">
                <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                    <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
                </button>
                <!-- Language Selection -->
                <select v-model="selectedLanguage" class="border border-slate-200 rounded-md px-2 h-6 hover:shadow-lg transition-all focus:outline outline-slate-900">
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                </select>
            </div>
        </div>
        <hr />

        <div class="flex flex-col gap-2 mt-2">
            <!-- Select Section -->
            <div class="flex items-center gap-4 justify-between">
                <p class="font-medium">Variable</p>
                <Handle id="source-main" type="source" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200 !top-[62px]" />
                <select @blur="showSelect = false" v-if="showSelect" @change="addBlock($event.target.value)" class="flex-1 px-4 h-8 rounded-md border border-slate-200 focus:outline outline-slate-900">
                    <option disabled selected>Choose Type</option>
                    <option v-for="option in options" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
                <button v-else @click="showSelect = true" class="size-6 rounded-md border border-slate-200 hover:shadow-lg transition-all flex items-center justify-center">
                    <span class="text-base"><i class="hgi hgi-stroke hgi-add-01"></i></span>
                </button>
            </div>
            <hr />

            <!-- Render Dynamic Blocks -->
            <div class="flex flex-col items-center gap-1">
                <template v-for="block in conditionalBlockData.variables" :key="block.id">
                    <div class="flex items-center gap-1 w-full">
                        <div class="flex-1">
                            <!-- string Blocks -->
                            <div v-if="block.type === 'String'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div class="text-start w-24 px-2 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key || "value " }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 flex items-center justify-center px-2 rounded-md">{{ block.type }}</p>
                                <input v-model="block.value" type="text" placeholder="Enter text" class="flex-1 rounded-md h-8 px-1 border border-slate-200 focus:outline outline-slate-900" />
                            </div>

                            <!-- Boolean Block -->
                            <div v-if="block.type === 'Bool'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div
                                    class="text-start w-24 px-2 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all"
                                    @dblclick="block.editing = true">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="block.editing">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="block.editing = false"
                                            @keyup.enter="block.editing = false"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>

                                <p class="border border-slate-200 h-8 flex items-center justify-center px-2 rounded-md">{{ block.type }}</p>
                                <button @click="toggleBoolean(block)" class="flex-1 rounded-md h-8 px-4 bg-slate-900 text-white hover:shadow-lg">
                                    {{ block.value ? "True" : "False" }}
                                </button>
                            </div>

                            <!-- Number Blocks -->
                            <div v-if="block.type === 'Number'" class="w-full flex items-center gap-1">
                                <div class="text-start w-24 px-2 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 flex items-center justify-center px-2 rounded-md">123</p>

                                <input type="text" v-model="block.value" class="flex-1 rounded-md h-8 px-2 border border-slate-200 focus:outline outline-slate-900 max-w-32" placeholder="0" />
                                <button type="button" class="size-6 rounded-md bg-slate-900 text-white hover:shadow-lg" @click="block.value--">-</button>
                                <button type="button" class="size-6 rounded-md bg-slate-900 text-white hover:shadow-lg" @click="block.value++">+</button>
                            </div>

                            <!-- null block -->
                            <div v-if="block.type === 'Null'" class="w-full flex items-center gap-1">
                                <div class="text-start w-24 px-2 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 font-medium rounded-md flex-1 flex items-center justify-center">Null</p>
                            </div>

                            <!-- select block -->
                            <div v-if="block.type === 'Select'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 px-2 flex items-center justify-center rounded-md">
                                    <span class=" "><i class="hgi-stroke hgi-sharp hgi-link-04"></i></span>
                                </p>
                                <input v-model="block.value" type="text" class="flex-1 rounded-md h-8 px-2 border border-slate-200 focus:outline outline-slate-900" placeholder="Enter path" />
                            </div>

                            <!-- now block -->
                            <div v-if="block.type === 'Now'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div class="text-start w-24 px-2 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 px-2 flex items-center justify-center rounded-md">img</p>
                                <p type="button" class="border border-slate-200 h-8 rounded-md flex-1 flex items-center justify-center">Now</p>
                            </div>

                            <!-- date block -->
                            <div v-if="block.type === 'Date'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 flex-1 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 px-2 flex items-center justify-center rounded-md">
                                    <span class=""><i class="hgi-stroke hgi-calendar-01"></i></span>
                                </p>
                                <input v-model="block.value" type="date" class="flex-1 rounded-md h-8 px-1 border border-slate-200 focus:outline outline-slate-900" />
                            </div>

                            <!-- date & time block -->
                            <div v-if="block.type === 'Date&Time'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 size-6 rounded-md flex items-center justify-center">
                                    <span class=""><i class="hgi-stroke hgi-calendar-01"></i></span>
                                </p>
                                <input
                                    v-model="block.value"
                                    type="datetime-local"
                                    id="datetime"
                                    name="datetime"
                                    class="flex-1 rounded-md h-8 px-1 border border-slate-200 focus:outline outline-slate-900" />
                            </div>

                            <!-- List variable -->
                            <div v-if="block.type === 'Json'" class="w-full flex gap-1">
                                <!-- Editable label container -->
                                <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <textarea
                                    name=""
                                    id=""
                                    v-model="block.value"
                                    class="border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg h-20 p-2 flex-1 rounded-md"
                                    placeholder="write json { }"></textarea>
                            </div>

                            <!-- getVariable -->
                            <div v-if="block.type === 'getVariable'" class="w-full flex items-center gap-1">
                                <!-- Editable label container -->
                                <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                                    <!-- Show input when editing, otherwise show text -->
                                    <template v-if="editing == block.id">
                                        <input
                                            type="text"
                                            v-model="block.key"
                                            @blur="editing = null"
                                            @keyup.enter="editing = null"
                                            class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                                    </template>
                                    <template v-else>
                                        {{ block.key }}
                                    </template>
                                </div>
                                <p class="border border-slate-200 h-8 px-2 flex items-center justify-center rounded-md">img</p>
                                <select name="" id="" class="px-2 h-8 rounded-md border border-slate-200 focus:outline outline-slate-900 flex-1">
                                    <option value="" disabled selected>Select Variable</option>
                                </select>
                            </div>
                        </div>

                        <button type="button" @click="removeBlock(block.id)" class="size-6">
                            <span class="hover:text-rose-500 text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
                        </button>
                    </div>
                </template>
            </div>

            <hr v-if="conditionalBlockData.variables?.length" />
            <!-- Main Condition Block -->
            <div class="flex flex-col gap-2 relative text-start" v-for="(condition, index) in conditionalBlockData.conditions" :key="condition.id">
                <div class="flex justify-between items-center">
                    <p class="font-medium">Condition {{ index + 1 }}</p>
                    <button @click="removeCondition(index)" class="hover:text-rose-500 size-6">
                        <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
                    </button>
                </div>

                <!-- Right Handle -->
                <Handle :id="'target-' + nodeId + '-' + index" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !-right-2 !top-3" />

                <textarea
                    type="text"
                    v-if="selectedLanguage === 'javascript'"
                    placeholder="write here Javascript"
                    class="p-2 h-20 rounded-md border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg transition-all"
                    v-model="condition.value"></textarea>

                <textarea
                    type="text"
                    v-if="selectedLanguage === 'java'"
                    placeholder="write here Java"
                    class="p-2 h-20 rounded-md border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg transition-all"
                    v-model="condition.value"></textarea>
            </div>

            <!-- Button to Add Condition -->
            <div class="flex justify-between items-center w-auto rounded-md">
                <button @click="addCondition" class="px-4 h-8 rounded-md bg-slate-900 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-1">
                    <span class="text-base"><i class="hgi hgi-stroke hgi-add-01"></i></span>
                    Add Condition
                </button>
                <div class="relative">
                    <p class="font-medium">Default ()</p>
                    <Handle type="source" position="right" id="then-output" class="!size-3 !bg-black !border-2 !border-slate-200 !right-[-8px]" />
                </div>
            </div>
        </div>
    </div>
</template>
