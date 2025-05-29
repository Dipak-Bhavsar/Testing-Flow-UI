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

const showSelect = ref(false);

const selectedLanguage = ref("javascript");

const toggleBoolean = (block) => {
    block.value = !block.value;
};
const evaluateBlock = ref({
    variables: [],
    conditions: [],
});
// Function to add a new block dynamically
const addBlock = (option) => {
    if (!option) return;
    evaluateBlock.value.variables.push({
        id: generateUUID(),
        key: "untitled",
        type: option,
        value: "",
    });
    showSelect.value = false;
};

const editing = ref(null);
//remove block
const removeBlock = (blockId) => {
    evaluateBlock.value.variables = evaluateBlock.value.variables.filter((block) => block.id !== blockId);
};

const evaluateBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    evaluateBlock,
    (newValues) => {
        window.valueJson[props.id] = newValues;
    },
    { deep: true }
);

onMounted(() => {
    console.log("Evaluate Block id : ", props.id);
});
</script>
<template>
    <div class="h-auto p-2 w-96 bg-white rounded-md shadow-lg border border-slate-200">
        <!-- Header -->
        <div class="h-8 w-full flex justify-between items-center">
            <p class="font-medium text-sm">Evaluate</p>
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
            <div class="flex justify-between items-center gap-2">
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
                <template v-for="block in evaluateBlock.variables" :key="block.id">
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
                <textarea
                    v-if="selectedLanguage === 'javascript'"
                    v-model="evaluateBlockData.condition"
                    type="text"
                    placeholder="write here javascript"
                    class="h-20 border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg transition-all rounded-md p-1"></textarea>
                <textarea
                    v-if="selectedLanguage === 'java'"
                    v-model="evaluateBlockData.condition"
                    type="text"
                    placeholder="write here java"
                    class="h-20 border border-slate-200 focus:outline outline-slate-900 hover:shadow-lg transition-all rounded-md p-1"></textarea>

                <select v-if="selectedLanguage === 'java'" name="" id="" class="border border-slate-200 rounded-md px-2 h-8 focus:outline outline-slate-900 hover:shadow-lg transition-all">
                    <option value="">Add Numbers</option>
                    <option value="">Combine two string to gather</option>
                    <option value="">Replace text</option>
                    <option value="">Get random list item</option>
                    <option value="">Test if between number</option>
                    <option value="">Combine Two array</option>
                    <option value="">Check if string contains another string</option>
                    <option value="">Check if two string are equal</option>
                    <option value="">Base 64 encode a string</option>
                    <option value="">Parse string to json</option>
                    <option value="">Sort list</option>
                    <option value="">Check if value is null</option>
                    <option value="">Get all the keys in an record</option>
                    <option value="">Assign value to variable</option>
                </select>
            </div>

            <div class="text-end relative">
                <p class="">Result</p>
                <Handle id="target-main" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200 !right-[-9px]" />
            </div>
        </div>
    </div>
</template>
