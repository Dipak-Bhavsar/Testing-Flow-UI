<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();
const props = defineProps({
    id: String,
    data: Object,
});

// Define the list of options for the dropdown
const options = ref(["String", "Bool", "Number", "Null", "Select", "Now", "Date", "Date&Time", "Json", "getVariable"]);

const selectedLanguage = ref("javascript");

const selectedCondition = ref("");
console.log("Selected Range : ", selectedCondition);

const showSelect = ref(false);

const toggleBoolean = (block) => {
    block.value = !block.value;
};
const ifBlocks = ref({
    variables: [],
    conditions: [],
});

// edit title
const ifTitle = ref("If");

const isEditing = ref(false);

function startEditing() {
    isEditing.value = true;
}

function stopEditing() {
    isEditing.value = false;
}

// Function to add a new block dynamically
const addBlock = (option) => {
    if (!option) return;

    ifBlocks.value.variables.push({
        id: generateUUID(),
        key: "untitled",
        type: option,
        value: "",
    });
    showSelect.value = false;
};
//remove block
const removeBlock = (blockId) => {
    ifBlocks.value.variables = ifBlocks.value.variables.filter((block) => block.id !== blockId);
};

const editing = ref(null);

// Single IfBlock Data (Static)
const ifBlocksData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    ifBlocks,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    // ifBlocks.value = window.valueJson[props.id] || { conditions: [] } || { variables: [] };
    console.log(props.id);
});

// select conditions
const getDefaultRangeBlocks = () => [
    { id: generateUUID(), key: "Num", value: 0 },
    { id: generateUUID(), key: "isLessThan", value: 0 },
    { id: generateUUID(), key: "isGreaterThan", value: 0 },
];

const rangeBlocks = ref(getDefaultRangeBlocks());

const removeConditionsBlock = (blockId) => {
    rangeBlocks.value = rangeBlocks.value.filter((b) => b.id !== blockId);
};

let isResettingRange = false;

watch(selectedCondition, (newVal) => {
    if (newVal === "range") {
        isResettingRange = true;
        rangeBlocks.value = getDefaultRangeBlocks();
        setTimeout(() => (isResettingRange = false), 0); // allow next tick
    }
});

watch(
    [ifBlocks, ifTitle],
    ([newConditionalData, newConditionTitle]) => {
        if (!window.valueJson) window.valueJson = {};
        window.valueJson[props.id] = {
            ...newConditionalData,
            ifTitle: newConditionTitle,
        };
    },
    { deep: true }
);
// Initialize data when component is mounted
onMounted(() => {
    if (window.valueJson && window.valueJson[props.id]) {
        const saved = window.valueJson[props.id];
        if (saved.variables) ifBlocks.value.variables = saved.variables;
        if (saved.conditions) ifBlocks.value.conditions = saved.conditions;
        if (saved.ifTitle) ifTitle.value = saved.ifTitle;
    }
});
</script>
<template>
    <div class="h-auto p-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <div>
                <p class="font-medium text-sm flex items-center gap-2" v-if="!isEditing" @dblclick="startEditing">
                    {{ ifTitle }}
                    <span class="text-md size-4">
                        <i class="hgi hgi-stroke hgi-pencil-edit-02"></i>
                    </span>
                </p>

                <input v-else v-model="ifTitle" @blur="stopEditing" @keyup.enter="stopEditing" class="rounded-md border border-slate-200 focus:outline outline-slate-900 px-2 py-1" />
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

        <!-- main block -->
        <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center justify-between gap-2">
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
                <!-- <Handle :id="'target-' + nodeId + '-' + index" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute" /> -->
            </div>
            <hr />

            <!-- Render Dynamic Blocks -->
            <div class="flex flex-col items-center gap-1">
                <template v-for="block in ifBlocks.variables" :key="block.id">
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

            <div class="flex flex-col gap-2">
                <!-- Conditionally render UI block based on selectedCondition -->
                <div v-if="selectedCondition === 'range'" class="w-full flex flex-col items-center gap-2">
                    <div v-for="block in rangeBlocks" :key="block.id" class="flex-1 flex items-center gap-1 w-full">
                        <!-- Editable key block -->
                        <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                            <template v-if="editing === block.id">
                                <input
                                    type="text"
                                    v-model="block.key"
                                    @blur="editing = null"
                                    @keyup.enter="editing = null"
                                    class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                            </template>
                            <template v-else>
                                {{ block.key || defaultName(block.id) }}
                            </template>
                        </div>

                        <!-- Static preview text -->
                        <p class="border border-slate-200 h-8 flex items-center justify-center px-2 rounded-md">123</p>

                        <!-- Editable value -->
                        <input type="text" v-model.number="block.value" class="flex-1 rounded-md h-8 px-2 border border-slate-200 focus:outline outline-slate-900 max-w-32" placeholder="0" />

                        <!-- Increment/Decrement -->
                        <button type="button" class="size-6 rounded-md bg-slate-900 text-white hover:shadow-lg" @click="block.value--">-</button>
                        <button type="button" class="size-6 rounded-md bg-slate-900 text-white hover:shadow-lg" @click="block.value++">+</button>

                        <!-- Delete -->
                        <button type="button" @click="removeConditionsBlock(block.id)" class="size-6 flex-1">
                            <span class="hover:text-rose-500 text-base">
                                <i class="hgi-stroke hgi-delete-02"></i>
                            </span>
                        </button>
                    </div>
                </div>

                <div v-if="selectedCondition === 'StringContain'" class="w-full flex flex-col items-center gap-2">
                    <div v-for="block in rangeBlocks" :key="block.id" class="flex-1 flex items-center gap-1 w-full">
                        <!-- Editable key block -->
                        <div class="text-start px-2 w-24 flex items-center justify-center border border-slate-200 rounded-md h-8 hover:shadow-lg transition-all" @dblclick="editing = block.id">
                            <template v-if="editing === block.id">
                                <input
                                    type="text"
                                    v-model="block.key"
                                    @blur="editing = null"
                                    @keyup.enter="editing = null"
                                    class="px-1 w-24 border border-slate-200 h-8 rounded-md focus:outline outline-slate-900 hover:shadow-lg" />
                            </template>
                            <template v-else>
                                {{ block.key || defaultName(block.id) }}
                            </template>
                        </div>

                        <!-- Static preview text -->
                        <p class="border border-slate-200 h-8 flex items-center justify-center px-2 rounded-md">123</p>

                        <!-- Editable value -->
                        <input type="text" v-model.number="block.value" class="flex-1 rounded-md h-8 px-2 border border-slate-200 focus:outline outline-slate-900 max-w-32" placeholder="0" />

                        <!-- Increment/Decrement -->
                        <button type="button" class="size-6 rounded-md bg-slate-900 text-white hover:shadow-lg" @click="block.value--">-</button>
                        <button type="button" class="size-6 rounded-md bg-slate-900 text-white hover:shadow-lg" @click="block.value++">+</button>

                        <!-- Delete -->
                        <button type="button" @click="removeConditionsBlock(block.id)" class="size-6 flex-1">
                            <span class="hover:text-rose-500 text-base">
                                <i class="hgi-stroke hgi-delete-02"></i>
                            </span>
                        </button>
                    </div>
                </div>

                <!-- JavaScript Textarea -->
                <textarea
                    v-if="selectedLanguage === 'javascript'"
                    v-model="ifBlocks.conditions"
                    placeholder="Write your JavaScript "
                    class="p-2 h-20 rounded-md border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg transition-all"></textarea>

                <!-- Java Textarea -->
                <textarea
                    v-if="selectedLanguage === 'java'"
                    v-model="ifBlocks.conditions"
                    placeholder="Write your Java "
                    class="p-2 h-20 rounded-md border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg transition-all"></textarea>
                <select
                    v-model="selectedCondition"
                    v-if="selectedLanguage === 'java'"
                    name=""
                    id=""
                    class="border border-slate-200 rounded-md px-2 h-8 focus:outline outline-slate-900 hover:shadow-lg transition-all">
                    <option disabled value="">Select Condition</option>
                    <option value="range">Check if number is between range</option>
                    <option value="StringContain">Check if string contains another string</option>
                    <option value="">Check if two string is equal</option>
                    <option value="">Check if value is not null</option>
                    <option value="">Check if list si empty</option>
                </select>
            </div>

            <!-- Flow Handle Outputs for THEN and ELSE -->
            <div class="relative flex justify-around items-center gap-2 w-full">
                <!-- Data Input Label -->
                <div class="flex">
                    <p class="">Data</p>
                    <div class="w-[50px] h-[1px] bg-slate-200 absolute left-[100px] top-1/2 transform -translate-y-1/2"></div>
                </div>
                <!-- Left Handle (Input) -->
                <Handle type="target" position="left" id="data-input" class="!size-3 !bg-black !border-2 !border-slate-200 !absolute !left-[-6px] !top-[50%]" />

                <!-- Vertical Section with THEN and ELSE -->
                <div class="flex flex-col gap-2 justify-end relative">
                    <!-- THEN -->
                    <div class="flex items-center gap-2 relative">
                        <!-- Horizontal Line -->
                        <div class="w-[100px] h-[1px] bg-slate-200 absolute left-[-100px] top-1/2 transform -translate-y-1/2"></div>
                        <!-- Label -->
                        <p class="border border-slate-200 rounded-md px-2 h-6 flex items-center z-10 bg-white">THEN</p>
                        <div class="w-[80px] h-[1px] bg-slate-200 absolute right-[-80px] top-1/2 transform -translate-y-1/2"></div>
                        <!-- Handle -->
                        <Handle type="source" position="right" id="then-output" class="!size-3 !bg-black !border-2 !border-slate-200 !right-[-80px]" />
                    </div>

                    <!-- ELSE -->
                    <div class="flex items-center gap-2 relative">
                        <!-- Horizontal Line -->
                        <div class="w-[100px] h-[1px] bg-slate-200 absolute left-[-100px] top-1/2 transform -translate-y-1/2"></div>
                        <!-- Label -->
                        <p class="border border-slate-200 rounded-md px-2 h-6 flex items-center z-10 bg-white">ELSE</p>
                        <div class="w-[85px] h-[1px] bg-slate-200 absolute right-[-80px] top-1/2 transform -translate-y-1/2"></div>
                        <!-- Handle -->
                        <Handle type="source" position="right" id="else-output" class="!size-3 !bg-black !border-2 !border-slate-200 !right-[-80px]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
