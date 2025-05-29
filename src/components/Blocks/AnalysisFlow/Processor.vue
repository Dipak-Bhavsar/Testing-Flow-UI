<script setup>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import { computed, getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import processorList from "../../../dummyData/processorList";
import seleniumWebElement from "../../../dummyData/seleniumWebElement";
import { useNodeStore } from "/src/stores/nodeStore";
const { removeNodes } = useVueFlow();
const nodeStore = useNodeStore();

const props = defineProps({
    id: String,
    data: Object,
});

const lastFour = computed(() => props.id?.slice(-4) || "");
const editableValue = ref(`${props.data.processorType}${lastFour.value}`);
const isEditing = ref(false);

const conditionalFieldSelectedOption = {};
const blockValues = reactive({});

// watch(
//     blockValues,
//     (newValues) => {
//         if (!window.valueJson) {
//             window.valueJson = {};
//         }
//         window.valueJson[props.id] = { ...newValues };
//     },
//     { deep: true }
// );

onMounted(() => {
    if (window.valueJson && window.valueJson[props.id]) {
        const savedData = window.valueJson[props.id];
        Object.assign(blockValues, savedData);

        if (savedData.label) {
            editableValue.value = savedData.label;
        }
        if (savedData.source) {
            props.data.source = savedData.source;
        }
        if (savedData.processorType) {
            props.data.processorType = savedData.processorType;
        }
        // ✅ Use correct casing to restore selectedParentId
        if (savedData?.ParentId) {
            selectedParentId.value = savedData.ParentId;
        }
    }
});

// onMounted(() => {
//     if (window.valueJson && window.valueJson[props.id]) {
//         Object.assign(blockValues, window.valueJson[props.id]);
//     }
// });

// const dynamicInputs = processorList[props.data.processorType].fields;

const dynamicInputs = props.data.source === "SeleniumAction" ? processorList[props.data.processorType]?.fields : seleniumWebElement[props.data.processorType]?.fields;

const currentFields = computed(() => {
    const fields = dynamicInputs?.[blockValues?.dynamicInputs]?.fields;
    return fields || [];
});

// console.log("Value json of the block :", window.valueJson);

// Add new Entry to the List type input field
const addToList = (items, ...fieldName) => {
    const formattedItems = items.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
    const target = fieldName.reduce((currentLevel, field, index) => (currentLevel[field] ??= index === fieldName.length - 1 ? [] : typeof field === "number" ? [] : {}), blockValues);

    target.push(formattedItems);
};

// Remove an Entry to the List type input field
const removeFromList = (index, ...fieldName) => {
    const target = fieldName.reduce((currentLevel, field) => currentLevel?.[field], blockValues);
    target.splice(index, 1);
};

const handleFileInput = (event, ...fieldName) => {
    const file = event.target.files[0];
    if (file) {
        fieldName.reduce((currentLevel, field, index) => {
            if (index === fieldName.length - 1) {
                currentLevel[field] = file;
            } else {
                currentLevel[field] = currentLevel[field] || (typeof field === "number" ? [] : {});
            }
            return currentLevel[field];
        }, blockValues);
    }
    updateDependantFieldOnChange(fieldName.join("."));
};

const updateConditionOptions = (field, options) => {
    if (!field.isConditional) return;
    const fieldName = field.name;
    const isSelected = blockValues[fieldName]?.selected;
    if (isSelected != undefined) {
        conditionalFieldSelectedOption[fieldName] = options[isSelected];
    } else {
        const keys = Object.keys(options);
        const key = Object.keys(options)?.[0] == "true" ? true : keys[0] == "false" ? false : keys[0];
        blockValues[fieldName] = { selected: key };
        options[isSelected];
        conditionalFieldSelectedOption[fieldName] = options[keys[0]];
    }
};

// Handle Form Submission
const updateDependantFieldOnChange = (field) => {};

onMounted(() => {
    const instance = getCurrentInstance();
    if (instance) {
        instance.appContext.config.globalProperties.$window = window;
    }
});

function saveEdit() {
    isEditing.value = false;
    const typed = editableValue.value.replace(new RegExp(`${lastFour.value}$`), "").trim();
    editableValue.value = `${typed}${lastFour.value}`;
    const index = nodeStore.nodes.findIndex((n) => n.id === props.id);
    if (index !== -1) {
        nodeStore.nodes[index].data.label = editableValue.value;
    }

    // ✅ Save manually too, just in case
    if (!window.valueJson) window.valueJson = {};
    if (!window.valueJson[props.id]) window.valueJson[props.id] = {};
    window.valueJson[props.id].label = editableValue.value;
}

const selectedParentId = ref("");

const parentIds = computed(() => {
    const currentIndex = nodes.value.findIndex((node) => node?.id === props.id);
    if (currentIndex > 0) {
        return nodes.value.slice(0, currentIndex).map((node) => {
            const id = node?.id || "";
            const lastFour = id.slice(-4);
            let label = node?.data?.label || "";
            if (!label.endsWith(lastFour)) {
                label += lastFour;
            }
            return {
                id,
                label,
            };
        });
    }
    return [];
});

const connectedParentIds = computed(() => {
    const nodeId = props.id;
    const edgesData = window.edges?.value || [];
    const valueJsonData = window.valueJson || {};

    if (!nodeId) return [];

    const result = [];

    // 1. Add connected parent nodes through edges
    let edge = edgesData.find((edge) => edge.target === nodeId);

    while (edge?.source) {
        const label = valueJsonData[edge.source]?.label || "Unnamed Node";
        result.push({ id: edge.source, label });
        edge = edgesData.find((e) => e.target === edge.source);
    }

    const isSelectedIdInList = result.find((item) => item.id === selectedParentId.value);

    // 2. If selected ID isn't in the list (edge removed), add it manually
    if (selectedParentId.value && !isSelectedIdInList) {
        const label = "Previously selected edge (disconnected)";
        result.push({ id: selectedParentId.value, label });
    }

    // 3. If there are no actual connected nodes and no selected ID, show a fake entry or control it via UI
    if (result.length === 0) {
        const label = "No edges or nodes connected found";
        result.push({ id: selectedParentId.value, label });
    }

    return result;
});

const hasSelectedNode = computed(() => !!nodeStore.selectedNodeId);

watch(
    () => ({
        ...blockValues,
        ParentId: selectedParentId.value,
        source: props.data.source,
        SeleniumType: props.data.processorType,
        label: editableValue.value,
    }),
    (newValues) => {
        if (!window.valueJson) {
            window.valueJson = {};
        }
        window.valueJson[props.id] = { ...newValues };
    },
    { deep: true }
);

// console.log("Parent id ID and label : ", parentIds);
// console.log("props.data.processorType", props.data.processorType);
</script>
<template>
    <div class="bg-white p-2 rounded-lg w-96 max-w-lg flex flex-col border border-slate-200 shadow-xl max-h-96 overflow-y-auto">
        <!-- Handle for input (target) -->
        <Handle type="target" :position="Position.Left" class="!size-3 !bg-black !border-2 !border-slate-200" />

        <div class="w-full min-h-8 flex items-center justify-between gap-2 pb-2">
            <div class="flex flex-col">
                <span class="font-medium flex items-start gap-2" @dblclick="isEditing = true">
                    <template v-if="isEditing">
                        <input v-model="editableValue" @blur="saveEdit" @keyup.enter="saveEdit" class="border border-slate-200 rounded-md focus:outline outline-slate-900 px-2 h-6" autofocus />
                    </template>
                    <template v-else class=""> {{ editableValue }}<i class="hgi hgi-stroke hgi-pencil-edit-02"></i> </template>
                </span>
                <p class="flex items-start gap-2">{{ props.data.processorType }}</p>
            </div>

            <button @click="removeNodes([props.id])" class="hover:text-rose-500 transition-all size-6">
                <span class="text-base"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <hr />

        <!-- Dynamic Form Fields -->
        <div class="flex flex-col gap-2 mt-2">
            <!-- Loop through the dynamic inputs and render them based on their type -->
            <div v-if="['sendKeys', 'click', 'submit'].includes(props.data.processorType)" class="flex flex-col gap-1 py-1">
                <div v-if="connectedParentIds.length > 0">
                    <select v-model="selectedParentId" class="border border-slate-200 rounded-md px-2 py-1 focus:outline outline-slate-900 cursor-pointer w-full">
                        <option disabled value="">Select Id</option>
                        <option v-for="item in connectedParentIds" :key="item.id" :value="item.id">
                            {{ item.label }}
                        </option>
                    </select>
                </div>
                <p v-else class="border border-slate-200 rounded-md px-2 py-1 text-center text-gray-500">No edge or node connected</p>
            </div>

            <div class="" v-for="(input, inputIndex) of dynamicInputs" :key="inputIndex">
                <div class="hidden">{{ updateConditionOptions(input, input.conditions) }}</div>
                <!-- <div class="hidden">{{createValueJson(input, input.conditions)}}</div> -->
                <!-- For text-based inputs like text, number, email, etc. -->
                <div v-if="input.type === 'html'">
                    <div class="" v-html="input.content"></div>
                </div>

                <div v-if="['text', 'number', 'email', 'password', 'url'].includes(input.type)">
                    <div class="w-full grid grid-cols-3 items-center gap-2">
                        <label :for="input.name + inputIndex" class="block font-medium peer relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                {{ input.tooltip }}
                            </p>
                        </label>
                        <div class="w-full col-span-2">
                            <input
                                :type="input.type"
                                v-model="blockValues[input.name]"
                                @change="updateDependantFieldOnChange(input.name)"
                                :id="input.name + inputIndex"
                                :placeholder="input.placeholder"
                                class="w-full rounded-md px-2 h-6 focus:outline outline-slate-900 border border-slate-200" />
                        </div>
                    </div>
                </div>

                <div v-if="input.type === 'file'">
                    <div class="w-full grid grid-cols-3 items-center gap-2">
                        <label :for="input.name + inputIndex" class="font-medium peer w-fit text-nowrap cursor-pointer relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                {{ input.tooltip }}
                            </p>
                        </label>
                        <div class="w-full col-span-2">
                            <input
                                type="file"
                                :id="input.name + inputIndex"
                                @change="handleFileInput($event, input.name)"
                                class="w-full file:mr-4 file:h-6 file:px-2 file:border-0 file:font-semibold file:bg-slate-900 file:text-white text-slate-400 border border-slate-200 rounded-md overflow-hidden hover:outline outline-1 outline-slate-900" />
                        </div>
                    </div>
                </div>

                <div v-if="input.type === 'textarea'">
                    <div class="w-full grid grid-cols-3 items-center gap-2">
                        <label :for="input.name + inputIndex" class="block font-medium relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                {{ input.tooltip }}
                            </p>
                        </label>
                        <div class="w-full col-span-2">
                            <textarea
                                class="rounded-md p-2 w-full resize-y focus:outline outline-slate-900 border border-slate-200"
                                :id="input.name + inputIndex"
                                v-model="blockValues[input.name]"
                                rows="5"
                                :placeholder="input.placeholder"></textarea>
                        </div>
                    </div>
                </div>

                <div v-if="input.type === 'radio'">
                    <div class="fw-full grid grid-cols-3 items-center gap-2">
                        <label class="block font-medium relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                {{ input.tooltip }}
                            </p>
                        </label>
                        <div class="w-full flex items-center gap-2 col-span-2">
                            <div v-for="(option, index) in input.options" :key="index" class="flex items-start">
                                <input
                                    v-if="input.isConditional"
                                    type="radio"
                                    :id="input.name + inputIndex + index"
                                    :value="option.value"
                                    v-model="blockValues[input.name].selected"
                                    class="border-slate-300 accent-slate-900" />
                                <input v-else type="radio" :id="input.name + inputIndex + index" :value="option.value" v-model="blockValues[input.name]" class="border-slate-300 accent-slate-900" />
                                <div class="ml-3">
                                    <label :for="input.name + inputIndex + index" class="block font-medium cursor-pointer"> {{ option.label }} </label>
                                    <!-- Display option subLabel if available -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="input.type === 'tabs'">
                    <div class="w-full grid grid-cols-3 items-center gap-2">
                        <label class="block font-medium relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                {{ input.tooltip }}
                            </p>
                        </label>
                        <div class="w-full col-span-2">
                            <div class="w-fit flex items-center gap-1 rounded-md bg-slate-100 p-1 mr-auto hover:bg-slate-200 transition-all">
                                <div v-for="(option, index) in input.options" :key="index" class="flex items-start">
                                    <input
                                        v-if="input.isConditional"
                                        type="radio"
                                        :id="input.name + inputIndex + index"
                                        :value="option.value"
                                        v-model="blockValues[input.name].selected"
                                        class="border-slate-300 hidden peer" />
                                    <input v-else type="radio" :id="input.name + inputIndex + index" :value="option.value" v-model="blockValues[input.name]" class="border-slate-300 hidden peer" />
                                    <label
                                        :for="input.name + inputIndex + index"
                                        class="text-slate-500 font-medium cursor-pointer px-2 h-6 flex items-center justify-center rounded-md peer-checked:bg-white peer-checked:shadow-md hover:bg-white hover:shadow-md transition-all peer-checked:text-black hover:text-black relative">
                                        {{ option.label }}
                                    </label>
                                    <!-- Display option subLabel if available -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="input.type === 'checkbox'">
                    <!-- For checkbox inputs -->
                    <div class="flex flex-row items-center gap-4">
                        <div class="w-full flex flex-row items-start">
                            <input
                                v-if="input.isConditional"
                                type="checkbox"
                                :id="input.name + inputIndex"
                                :value="input.value"
                                v-model="blockValues[input.name].selected"
                                class="border-slate-300 accent-slate-900" />
                            <input v-else type="checkbox" :id="input.name + inputIndex" :value="input.value" v-model="blockValues[input.name]" class="border-slate-300 accent-slate-900" />
                            <div class="relative ml-3">
                                <label :for="input.name + inputIndex" class="block font-medium peer w-fit cursor-pointer text-balance relative">
                                    {{ input.label }}
                                    <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                    <p
                                        v-if="input.tooltip"
                                        class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                        {{ input.tooltip }}
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="input.type === 'select'">
                    <div class="w-full grid grid-cols-3 items-center gap-2">
                        <label :for="input.name + inputIndex" class="block font-medium relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                {{ input.tooltip }}
                            </p>
                        </label>
                        <div class="w-full col-span-2">
                            <select
                                v-if="input.isConditional"
                                v-model="blockValues[input.name].selected"
                                :id="input.name + inputIndex"
                                class="mt-1 block w-full px-2 h-6 border border-slate-200 focus:outline outline-slate-900 rounded-md">
                                <option v-for="option in input.options" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                            <select
                                v-else
                                v-model="blockValues[input.name]"
                                :id="input.name + inputIndex"
                                class="block w-full px-2 h-6 border border-slate-200 focus:outline outline-slate-900 rounded-md">
                                <option v-for="option in input.options" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div v-if="input.type === 'list'">
                    <div class="flex flex-col gap-2">
                        <label :for="input.name" class="font-medium flex items-center relative">
                            {{ input.label }}
                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                            <p
                                v-if="input.tooltip"
                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-m">
                                {{ input.tooltip }}
                            </p>

                            <button @click="addToList(input.options, input.name)" class="ml-auto p-2 cursor-pointer">
                                <i class="hgi-stroke hgi-add-01"></i>
                            </button>
                        </label>
                        <div class="w-full px-1">
                            <!-- No items yet message and add button -->

                            <div v-if="!blockValues[input.name] || blockValues[input.name]?.length === 0">
                                <div @click="addToList(input.options, input.name)" class="w-full">
                                    <p
                                        class="border-slate-200 p-2 text-slate-300 rounded-md cursor-pointer text-center border-2 hover:border-dashed border-transparent hover:border-slate-400 transition-all">
                                        No {{ input.label }} yet.
                                    </p>
                                </div>
                            </div>
                            <!-- List of items -->
                            <div v-if="blockValues[input.name]?.length > 0" class="rounded-md overflow-hidden border border-slate-200 divide-y-[1px]">
                                <div v-for="(option, parentIndex) in blockValues[input.name]" :key="parentIndex">
                                    <div class="flex flex-row items-center justify-center gap-x-2 divide-x-[1px]">
                                        <!-- Render input fields for each key in the option -->

                                        <div class="flex-1" v-for="(optionObj, index) in input.options" :key="index">
                                            <div class="" v-if="['text', 'number', 'email', 'password', 'url'].includes(optionObj.type)">
                                                <div class="">
                                                    <input
                                                        :type="optionObj.type"
                                                        v-model="blockValues[input.name][parentIndex][optionObj.name]"
                                                        :id="optionObj.name + parentIndex + index"
                                                        :placeholder="optionObj.placeholder"
                                                        class="block flex-1 px-2 h-6 focus:outline-none" />
                                                </div>
                                            </div>
                                            <div class="" v-if="optionObj.type === 'file'">
                                                <input
                                                    :type="optionObj.type"
                                                    :id="optionObj.name + parentIndex + index"
                                                    @change="handleFileInput($event, input.name, parentIndex, optionObj.name)"
                                                    class="flex-1 file:mr-4 file:h-8 file:px-4 file:border-0 file:font-semibold file:bg-slate-900 file:text-white text-slate-400" />
                                            </div>
                                        </div>

                                        <!-- Remove button -->
                                        <div @click="removeFromList(index, input.name)" class="hover:text-rose-500 transition-all cursor-pointer size-8 flex items-center justify-center">
                                            <i class="hgi-stroke hgi-delete-02 text-base"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- For Conditionally Rendered Items  -->
                <div v-if="input.isConditional">
                    <div class="flex flex-row items-center gap-4">
                        <div :class="`${conditionalFieldSelectedOption[input.name]?.length > 0 ? 'p-2 border border-slate-200 rounded-md w-full mt-4 overflow-hidden' : ''}`">
                            <!-- Conditional Logic Renders Here  -->
                            <div class="space-y-4">
                                <div v-for="(conditionalInput, inputIndex) in conditionalFieldSelectedOption[input.name]" :key="inputIndex">
                                    <div v-if="['text', 'number', 'email', 'password', 'url'].includes(conditionalInput.type)" class="grid grid-cols-3 gap-2 items-center">
                                        <label :for="input.name + conditionalInput.name + inputIndex" class="block font-medium relative">
                                            {{ conditionalInput.label }}
                                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                            <p
                                                v-if="conditionalInput.tooltip"
                                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                {{ conditionalInput.tooltip }}
                                            </p>
                                        </label>
                                        <input
                                            :type="conditionalInput.type"
                                            v-model="blockValues[input.name][conditionalInput.name]"
                                            :id="input.name + conditionalInput.name + inputIndex"
                                            :placeholder="conditionalInput.placeholder"
                                            class="col-span-2 block w-full rounded-md px-2 h-6 border border-slate-200 focus:outline-slate-900 peer" />
                                    </div>

                                    <div v-if="conditionalInput.type === 'file'">
                                        <div class="relative grid grid-cols-3 gap-2 items-center">
                                            <label :for="input.name + conditionalInput.name + inputIndex" class="font-medium peer w-fit text-balance cursor-pointer relative">
                                                {{ conditionalInput.label }}
                                                <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                                <p
                                                    v-if="conditionalInput.tooltip"
                                                    class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                    {{ conditionalInput.tooltip }}
                                                </p>
                                            </label>
                                            <input
                                                type="file"
                                                :id="input.name + conditionalInput.name + inputIndex"
                                                @change="handleFileInput($event, input.name, conditionalInput.name)"
                                                class="col-span-2 w-full border border-slate-200 focus:outline-slate-900 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-slate-900 file:text-white text-slate-400 overflow-hidden hover:outline outline-1 outline-slate-900" />
                                        </div>
                                    </div>

                                    <div v-if="conditionalInput.type === 'textarea'" class="grid grid-cols-3 gap-2 items-center">
                                        <label :for="input.name + conditionalInput.name + inputIndex" class="block font-medium relative">
                                            {{ conditionalInput.label }}
                                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                            <p
                                                v-if="conditionalInput.tooltip"
                                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                {{ conditionalInput.tooltip }}
                                            </p>
                                        </label>
                                        <textarea
                                            class="col-span-2 border border-slate-200 rounded-md p-2 w-full resize-y focus:outline-slate-900 mt-1"
                                            :id="input.name + conditionalInput.name + inputIndex"
                                            v-model="blockValues[input.name][conditionalInput.name]"
                                            rows="5"
                                            :placeholder="conditionalInput.placeholder"></textarea>
                                    </div>

                                    <div v-if="conditionalInput.type === 'radio'">
                                        <div class="block grid grid-cols-3 gap-2 items-center">
                                            <label class="block font-medium relative">
                                                {{ conditionalInput.label }}
                                                <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                                <p
                                                    v-if="conditionalInput.tooltip"
                                                    class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                    {{ conditionalInput.tooltip }}
                                                </p>
                                            </label>

                                            <div v-for="(option, index) in conditionalInput.options" :key="index" class="col-span-2 flex items-start mt-2">
                                                <input
                                                    type="radio"
                                                    :value="option.value"
                                                    :id="input.name + conditionalInput.name + inputIndex + index"
                                                    v-model="blockValues[input.name][conditionalInput.name]"
                                                    class="border-slate-300 accent-slate-900" />
                                                <div class="ml-3">
                                                    <label :for="input.name + conditionalInput.name + inputIndex + index" class="block font-medium cursor-pointer relative">
                                                        {{ option.label }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="conditionalInput.type === 'checkbox'">
                                        <div class="flex items-start relative">
                                            <input
                                                type="checkbox"
                                                :id="input.name + conditionalInput.name + inputIndex"
                                                :value="conditionalInput.value"
                                                v-model="blockValues[input.name][conditionalInput.name]"
                                                class="border-slate-300 accent-slate-900" />
                                            <div class="ml-3">
                                                <label :for="input.name + conditionalInput.name + inputIndex" class="block font-medium peer w-fit text-balance cursor-pointer relative">
                                                    {{ conditionalInput.label }}
                                                    <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                                    <p
                                                        v-if="conditionalInput.tooltip"
                                                        class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                        {{ conditionalInput.tooltip }}
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="conditionalInput.type === 'select'" class="grid grid-cols-3 gap-2 items-center">
                                        <label :for="input.name + conditionalInput.name + inputIndex" class="block font-medium relative">
                                            {{ conditionalInput.label }}
                                            <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                            <p
                                                v-if="conditionalInput.tooltip"
                                                class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                {{ conditionalInput.tooltip }}
                                            </p>
                                        </label>
                                        <select
                                            v-model="blockValues[input.name][conditionalInput.name]"
                                            :id="input.name + conditionalInput.name + inputIndex"
                                            class="col-span-2 block w-full px-2 h-6 border border-slate-200 focus:outline outline-slate-900 rounded-md bg-white">
                                            <option v-for="option in conditionalInput.options" :key="option.value" :value="option.value">{{ option.label }}</option>
                                        </select>
                                    </div>

                                    <div v-if="conditionalInput.type === 'list'">
                                        <div class="">
                                            <div class="w-full px-1">
                                                <div class="flex flex-row items-center">
                                                    <label :for="conditionalInput.name" class="block font-medium relative">
                                                        {{ conditionalInput.label }}
                                                        <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                                        <p
                                                            v-if="conditionalInput.tooltip"
                                                            class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                            {{ conditionalInput.tooltip }}
                                                        </p>
                                                    </label>
                                                    <button @click="addToList(conditionalInput.options, input.name, conditionalInput.name)" class="ml-auto p-2 cursor-pointer">
                                                        <i class="hgi-stroke hgi-add-01"></i>
                                                    </button>
                                                </div>
                                                <!-- No items yet message and add button -->
                                                <div v-if="!blockValues[input.name][conditionalInput.name] || blockValues[input.name][conditionalInput.name]?.length === 0">
                                                    <div @click="addToList(conditionalInput.options, input.name, conditionalInput.name)" class="w-full">
                                                        <p
                                                            class="border-slate-200 p-2 text-slate-300 rounded-md cursor-pointer text-center border-2 hover:border-dashed border-transparent hover:border-slate-200 transition-all">
                                                            No {{ conditionalInput.label }} yet. <span class="text-sm peer cursor-pointer"><i class="hgi-stroke hgi-information-circle"></i></span>
                                                        </p>

                                                        <p
                                                            v-if="conditionalInput.tooltip"
                                                            class="absolute w-64 top-8 hidden peer-hover:inline-block p-2 bg-slate-900 text-white text-pretty leading-relaxed transition-all shadow-lg rounded-md z-50">
                                                            {{ conditionalInput.tooltip }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <!-- List of items -->
                                                <div v-if="blockValues[input.name][conditionalInput.name]?.length > 0" class="rounded-md overflow-hidden border border-slate-200 divide-y-[1px]">
                                                    <div v-for="(option, parentIndex) in blockValues[input.name][conditionalInput.name]" :key="parentIndex">
                                                        <div class="flex flex-row items-center justify-center gap-x-2 divide-x-[1px]">
                                                            <!-- Render input fields for each key in the option -->
                                                            <div class="flex-1" v-for="(optionObj, index) in conditionalInput.options" :key="index">
                                                                <div class="" v-if="['text', 'number', 'email', 'password', 'url'].includes(optionObj.type)">
                                                                    <div class="">
                                                                        <input
                                                                            :type="optionObj.type"
                                                                            v-model="blockValues[input.name][conditionalInput.name][parentIndex][optionObj.name]"
                                                                            :id="input.name + conditionalInput.name + parentIndex + index"
                                                                            :placeholder="optionObj.placeholder"
                                                                            class="block flex-1 px-2 h-6 focus:outline-none" />
                                                                    </div>
                                                                </div>
                                                                <div class="" v-if="optionObj.type === 'file'">
                                                                    <input
                                                                        :type="optionObj.type"
                                                                        :id="input.name + conditionalInput.name + parentIndex + index"
                                                                        @change="handleFileInput($event, input.name, conditionalInput.name, parentIndex, optionObj.name)"
                                                                        class="flex-1 file:mr-4 file:h-6 file:px-2 file:border-0 file:font-semibold file:bg-slate-900 file:text-white text-slate-400" />
                                                                </div>
                                                            </div>

                                                            <!-- Remove button -->
                                                            <div
                                                                @click="removeFromList(index, input.name, conditionalInput.name)"
                                                                class="hover:text-rose-500 transition-all cursor-pointer size-8 flex items-center justify-center">
                                                                <i class="hgi-stroke hgi-delete-02 text-base"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="conditionalInput.type === 'html'">
                                        <div class="" v-html="conditionalInput.content"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Handle for output (source) -->
        <Handle type="source" :position="Position.Right" class="!size-3 !bg-black !border-2 !border-slate-200" />
    </div>
</template>
