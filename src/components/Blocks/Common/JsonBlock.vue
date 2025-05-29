<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";
const { removeNodes } = useVueFlow();

const props = defineProps({
    id: String,
    data: Object,
});

const options = ref(["String", "Bool", "Number", "Null", "Select", "Now", "Date", "Date&Time", "Json", "getVariable"]);

const showSelect = ref(false);

// Function to toggle Boolean value
const toggleBoolean = (block) => {
    block.value = !block.value;
};

const editing = ref(null);

const listBlocks = ref({
    variables: [],
    conditions: [],
});
// Function to add a new block dynamically
const addBlock = (option) => {
    if (!option) return;
    listBlocks.value.variables.push({
        id: generateUUID(),
        key: "untitled",
        type: option,
        value: "",
    });
    showSelect.value = false;
};

watch(
    listBlocks,
    (newValues) => {
        props.data.listBlocks = JSON.parse(JSON.stringify(newValues));
        if (!window.valueJson) window.valueJson = {};
        window.valueJson[props.id] = JSON.parse(JSON.stringify(newValues));
    },
    { deep: true }
);
onMounted(() => {
    console.log("List block id:", props.id);
    if (props.data?.listBlocks) {
        listBlocks.value = JSON.parse(JSON.stringify(props.data.listBlocks));
    } else if (window.valueJson?.[props.id]) {
        listBlocks.value = JSON.parse(JSON.stringify(window.valueJson[props.id]));
    }
});

// Function to remove block by id
const removeBlock = (blockId) => {
    listBlocks.value.variables = listBlocks.value.variables.filter((block) => block.id !== blockId);
};

const isEditing = ref(false);

const startEditing = () => {
    isEditing.value = true;
};
const stopEditing = () => {
    isEditing.value = false;
    // Ensure the change is reflected in the node's data
    props.data.jsonLabel = jsonBlockData.value.jsonLabel;

    // (Optional) Update global cache if you're still using it
    if (!window.valueJSON) window.valueJSON = {};
    window.valueJSON[props.id] = { ...jsonBlockData.value };
};

const jsonBlockData = ref({
    jsonLabel: "Json",
});

watch(
    jsonBlockData,
    (newValues) => {
        if (!window.valueJSON) window.valueJSON = {};
        window.valueJSON[props.id] = { ...newValues };
        console.log("✅ Updated RepeatBlock Value:", window.valueJSON);
    },
    { deep: true }
);

onMounted(() => {
    const saved = window.valueJSON?.[props.id];
    if (saved) {
        jsonBlockData.value = {
            ...jsonBlockData.value,
            ...saved,
        };
    } else if (props.data.jsonLabel) {
        // fallback to node data
        jsonBlockData.value.jsonLabel = props.data.jsonLabel;
    }
});
</script>

<template>
    <div class="p-2 bg-white w-96 h-auto rounded-md border border-slate-200 shadow-lg font-medium">
        <div class="h-8 w-full flex justify-between items-center">
            <div class=" ">
                <p class="font-medium text-sm flex item-center gap-2" v-if="!isEditing" @dblclick="startEditing">
                    {{ jsonBlockData.jsonLabel }}
                    <span class="">
                        <i class="hgi hgi-stroke hgi-pencil-edit-02"></i>
                    </span>
                </p>

                <input v-else v-model="jsonBlockData.jsonLabel" @blur="stopEditing" @keyup.enter="stopEditing" class="rounded-md border border-slate-200 focus:outline outline-slate-900 px-2 py-1" />
            </div>
            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />

        <div class="flex flex-col gap-2 mt-2">
            <div class="flex justify-between items-center gap-2">
                <p class="w-auto rounded-md border border-slate-200 px-2 h-8 flex items-center">key</p>
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
            <div class="flex flex-col items-center gap-2">
                <template v-for="block in listBlocks.variables" :key="block.id">
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
        </div>

        <Handle :id="'source' + id" type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
