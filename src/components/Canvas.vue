<script setup>
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { useVueFlow, VueFlow } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import { computed, ref, watch } from "vue";
import processorList from "../dummyData/processorList";
import { generateUUID } from "../utils/helpers";
import ValidateBlock from "./Blocks/Common/ValidateBlock.vue";
import AiRequest from "/src/components/Blocks/Common/AiRequest.vue";
import BooleanBlock from "/src/components/Blocks/Common/BooleanBlock.vue";
import CollectBlock from "/src/components/Blocks/Common/CollectBlock.vue";
import ConditionBlock from "/src/components/Blocks/Common/ConditionBlock.vue";
import CreateVariableBlock from "/src/components/Blocks/Common/CreateVariableBlock.vue";
import CustomNode from "/src/components/Blocks/Common/CustomNode.vue";
import DateBlock from "/src/components/Blocks/Common/DateBlock.vue";
import DateTimeBlock from "/src/components/Blocks/Common/DateTimeBlock.vue";
import DelayBlock from "/src/components/Blocks/Common/DelayBlock.vue";
import DisplayBlock from "/src/components/Blocks/Common/DisplayBlock.vue";
import DynamicBlock from "/src/components/Blocks/Common/DynamicBlock.vue";
import EvaluateBlock from "/src/components/Blocks/Common/EvaluateBlock.vue";
import FlowBlock from "/src/components/Blocks/Common/FlowBlock.vue";
import ForBlock from "/src/components/Blocks/Common/ForBlock.vue";
import GetVariable from "/src/components/Blocks/Common/GetVariable.vue";
import HttpRequestBlock from "/src/components/Blocks/Common/HttpRequestBlock.vue";
import IfBlock from "/src/components/Blocks/Common/IfBlock.vue";
import InputBlock from "/src/components/Blocks/Common/InputBlock.vue";
import JavaCode from "/src/components/Blocks/Common/JavaCode.vue";
import ListBlock from "/src/components/Blocks/Common/ListBlock.vue";
import LogBlock from "/src/components/Blocks/Common/LogBlock.vue";
import NowBlock from "/src/components/Blocks/Common/NowBlock.vue";
import NullBlock from "/src/components/Blocks/Common/NullBlock.vue";
import NumberBlock from "/src/components/Blocks/Common/NumberBlock.vue";
import OutputBlock from "/src/components/Blocks/Common/OutputBlock.vue";
import Processor from "/src/components/Blocks/Common/Processor.vue";
import RecordBlock from "/src/components/Blocks/Common/RecordBlock.vue";
import Repeat from "/src/components/Blocks/Common/Repeat.vue";
import SelectBlock from "/src/components/Blocks/Common/SelectBlock.vue";
import StringBlock from "/src/components/Blocks/Common/StringBlock.vue";
import TemplateBlock from "/src/components/Blocks/Common/TemplateBlock.vue";
import { useNodeStore } from "/src/stores/nodeStore";

const { onInit, addNodes, addEdges, removeNodes, removeEdges, fitView, viewport } = useVueFlow();

// const nodes = ref([
//     {
//         id: generateUUID(),
//         type: "inputBlock",
//         position: { x: 100, y: 200 },
//         data: { label: "Start" },
//     },
// ]);

// Make it available globally to children

const edges = ref([]);
window.valueJson = ref({});

onInit(() => fitView());
// new create processor function add
const createdNodeIds = ref([]);

// const createProcessor = (type) => {
//     const newNodeId = generateUUID();
//     const newNode = {
//         id: newNodeId,
//         position: { x: Math.random() * 300, y: Math.random() * 500 },
//         type: "createProcessor",
//         data: {
//             type,
//             onRemove: (id) => removeNodeById(id),
//         },
//     };
//     nodes.value.push(newNode);
// };

//  global function to add nodes
const nodeStore = useNodeStore();
function createProcessor(type) {
    nodeStore.addNode(type);
}

const validateBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "validateBlock",
        data: { label: "validate", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Validate Block Added:", JSON.stringify(newNode, null, 3));
};

const javaCodeBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "javaCodeBlock",
        data: { label: " Java ", onRemove: (id) => removeNodeById(id) },
        // draggable: false,
    };
    nodes.value.push(newNode);
    console.log("javaCode Block Added:", JSON.stringify(newNode, null, 3));
};

const inputBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "inputBlock",
        data: { label: "Start", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Start Block Added:", JSON.stringify(newNode, null, 3));
};

const outputBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "outputBlock",
        data: { label: "Output", onRemove: (id) => removeNodeById(id) },
    };
    // Add the new node to the nodes array
    nodes.value.push(newNode);
    // Log the newly added node
    console.log("Output Block Added:", JSON.stringify(newNode, null, 3));
};

const addNewNode = () => {
    const newNodeId = generateUUID();
    // Define dynamic inputs and outputs
    const inputs = [`Input ${newNodeId}`];
    const outputs = [`Output ${newNodeId}`];
    // Create the new node with random position
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "custom",
        data: { label: `Node ${newNodeId}`, inputs, outputs },
    };
    // Add the new node to the nodes array
    nodes.value.push(newNode);
    // Log the newly added node
    console.log("New Node Added:", JSON.stringify(newNode, null, 3));
};

const conditionBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "conditionBlock",
        data: { label: "Condition", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Condition Block Added:", JSON.stringify(newNode, null, 3));
};

const dynamicBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "dynamicBlock",
        data: { label: "DynamicBlock", onRemove: (id) => removeNodeById(id) },
    };
    // Add the new node to the nodes array
    nodes.value.push(newNode);
    // Log the newly added node
    console.log("Dynamic Block :", JSON.stringify(newNode, null, 3));
};

const ifBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "ifBlock",
        data: { label: "ifBlock", onRemove: (id) => removeNodeById(id) },
    };
    // Add the new node to the nodes array
    nodes.value.push(newNode);
    // Log the newly added node
    console.log("If Block Added:", JSON.stringify(newNode, null, 3));
};

const evaluateBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "evaluateBlock",
        data: { label: "EvaluateBlock", onRemove: (id) => removeNodeById(id) },
    };
    // Add the new node to the nodes array
    nodes.value.push(newNode);
    // Log the newly added node
    console.log("Evaluate Block Added:", JSON.stringify(newNode, null, 3));
};

const delayBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "delayBlock",
        data: { label: "DelayBlock", onRemove: (id) => removeNodeById(id) },
    };
    // Add the new node to the nodes array
    nodes.value.push(newNode);
    // Log the newly added node
    console.log("Delay Block Added:", JSON.stringify(newNode, null, 3));
};

const repeatBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "repeat", // Must match the key in :node-types
        data: { label: "RepeatBlock", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Repeat Block Added:", JSON.stringify(newNode, null, 3));
};

const forBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "forBlock", // Must match the key in :node-types
        data: { label: "forBlock", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("For Block Added:", JSON.stringify(newNode, null, 3));
};

const collectBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "collectBlock", // Must match the key in :node-types
        data: { label: "CollectBlock", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Collect Block Added:", JSON.stringify(newNode, null, 3));
};

const displayBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "displayBlock",
        data: { label: "DisplayBlock", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Display Block Added:", JSON.stringify(newNode, null, 3));
};

const logBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "logBlock", // Must match the key in :node-types
        data: { label: "Log Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Log Block Added:", JSON.stringify(newNode, null, 3));
};

const stringBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "stringBlock", // Must match the key in :node-types
        data: { label: "String Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("String Block Added:", JSON.stringify(newNode, null, 3));
};

const booleanBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "booleanBlock", // Must match the key in :node-types
        data: { label: "Boolean Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Boolean Block Added:", JSON.stringify(newNode, null, 3));
};

const numberBlock = () => {
    const newNodeId = generateUUID();
    // Create the new node with a random position
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "numberBlock", // Must match the key in :node-types
        data: { label: "Number Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Number  Block Added:", JSON.stringify(newNode, null, 3));
};

const nullBlock = () => {
    const newNodeId = generateUUID();
    // Create the new node with a random position
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "nullBlock", // Must match the key in :node-types
        data: { label: "Null Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Null Block Added:", JSON.stringify(newNode, null, 3));
};

const selectBlock = () => {
    const newNodeId = generateUUID();
    // Create the new node with a random position
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "selectBlock", // Must match the key in :node-types
        data: { label: "select Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Select Block Added:", JSON.stringify(newNode, null, 3));
};

const nowBlock = () => {
    const newNodeId = generateUUID();
    // Create the new node with a random position
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "nowBlock", // Must match the key in :node-types
        data: { label: "Now Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Now Block Added:", JSON.stringify(newNode, null, 3));
};

const dateBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "dateBlock", // Must match the key in :node-types
        data: { label: "Date Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Date Block Added:", JSON.stringify(newNode, null, 3));
};

const dateTimeBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "dateTimeBlock", // Must match the key in :node-types
        data: { label: "Date & Time Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Date & Time Block Added:", JSON.stringify(newNode, null, 3));
};

const templateBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "templateBlock", // Must match the key in :node-types
        data: { label: "Template Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Template Block Added:", JSON.stringify(newNode, null, 3));
};

const httpRequestBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "httpRequestBlock", // Must match the key in :node-types
        data: { label: "HTTP Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("HTTP Block Added:", JSON.stringify(newNode, null, 3));
};

const createBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "createBlock", // Must match the key in :node-types
        data: { label: "Create Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Create Block Added:", JSON.stringify(newNode, null, 3));
};

const getVariableBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "getVariableBlock",
        data: { label: "Get-Variable Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Get Variable Block Added:", JSON.stringify(newNode, null, 3));
};

const aiRequestBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 }, // Only for new node
        type: "aiRequestBlock", // Must match the key in :node-types
        data: { label: "AI-request Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("AI-request Block Added:", JSON.stringify(newNode, null, 3));
};

const listBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "listBlock",
        data: { label: "List", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("List Block Added:", JSON.stringify(newNode, null, 3));
};

const recordBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "recordBlock",
        data: { label: "Record Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Record Block Added:", JSON.stringify(newNode, null, 3));
};

const flowBlock = () => {
    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: { x: Math.random() * 300, y: Math.random() * 500 },
        type: "flowBlock",
        data: { label: "flow-Block", onRemove: (id) => removeNodeById(id) },
    };
    nodes.value.push(newNode);
    console.log("Flow Block Added:", JSON.stringify(newNode, null, 3));
};

const parentMap = reactive({});
const onConnect = (connection) => {
    const newEdge = {
        ...connection,
        id: generateUUID(), // Generate a unique ID for the edge
        animated: true,
        style: { stroke: "#0f172a", strokeWidth: 2 },
        markerEnd: "arrowclosed",
        // label: "X",
        labelStyle: { fill: "#0f172a", background: "black", padding: "4px", fontSize: "10px" },
    };
    addEdges([newEdge]); // Add edge to Vue Flow
};

const removeNodeById = (nodeId) => {
    removeNodes([nodeId]);
    edges.value = edges.value.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
};

const removeEdge = (event) => {
    const edgeId = event.edge.id;
    removeEdges([edgeId]);
};

const showBlock = ref(false);

const handleButtonClick = () => {
    showBlock.value = false; // Hide the block list after selection
};

// save the all flow
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.41:8080";

const saveFlow = async () => {
    const flowData = {
        id: generateUUID(),
        nodes: nodes.value,
        edges: edges.value,
        valueJson: window.valueJson,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/vue-flow/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flowData),
        });

        const result = await response.json();
        console.log("Flow saved successfully with ID:", result.id);
        // console.log("Flow JSON : ", nodes.value, edges.value, window.valueJson);
    } catch (error) {
        console.error("Error saving flow:", error);
    }
};

//  fetchFlow by id
const fetchFlow = async (id) => {
    try {
        const response = await fetch("http://localhost:8080/vue-flow/fetchFlow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error("Flow not found");

        const data = await response.json();

        // Update Vue Flow state
        nodes.value = data.nodes || [];
        edges.value = data.edges || [];
        window.valueJson = data.valueJson || {};

        // console.log("Flow loaded successfully!", nodes.value, edges.value, window.valueJson);
    } catch (error) {
        console.error("Error fetching flow:", error);
    }
};

const activeSection = ref(null); // Keeps track of the currently active section

const toggleSection = (section) => {
    activeSection.value = activeSection.value === section ? null : section;
};

// Example data for each section
const blockObj = ref({
    Action: [
        { label: "HTTP Request", method: httpRequestBlock },
        { label: "AI-Request", method: aiRequestBlock },
        { label: "Flow-Block", method: flowBlock },
    ],
    Trigger: [
        { label: "Input", method: inputBlock },
        { label: "Output", method: outputBlock },
    ],
    Logic: [
        { label: "Condition", method: conditionBlock },
        { label: "Validate", method: validateBlock },
        { label: "If-Block", method: ifBlock },
        { label: "Evaluate", method: evaluateBlock },
        { label: "Delay", method: delayBlock },
    ],
    Looping: [
        { label: "Repeat", method: repeatBlock },
        { label: "For", method: forBlock },
        { label: "Collect", method: collectBlock },
    ],
    Visualize: [
        { label: "Display", method: displayBlock },
        { label: "Log", method: logBlock },
    ],
    Data: [
        { label: "String", method: stringBlock },
        { label: "Bool", method: booleanBlock },
        { label: "Number", method: numberBlock },
        { label: "Null", method: nullBlock },
        { label: "Select", method: selectBlock },
        { label: "Now", method: nowBlock },
        { label: "Date", method: dateBlock },
        { label: "Date & Time", method: dateTimeBlock },
        { label: "List", method: listBlock },
        { label: "Record", method: recordBlock },
        { label: "Create variable", method: createBlock },
        { label: "Get variable", method: getVariableBlock },
        { label: "Template", method: templateBlock },
    ],
    ProcessorList: [{}],
    Other: [
        { label: "Dynamic Block", method: dynamicBlock },
        { label: "JavaCode Block", method: javaCodeBlock },
    ],
});

const processorKeys = computed(() => Object.keys(processorList));

// Function to add processor keys dynamically
const addProcessorBlocks = () => {
    processorKeys.value.forEach((key) => {
        blockObj.value.ProcessorList.push({
            label: key, // Use key as label
            method: createProcessor, // Assign the method (you can change it if needed)
            type: key, // Set type as key
        });
    });
};

// Call the function to add processor blocks
addProcessorBlocks();
// Search state
const searchQuery = ref("");
const searchTrigger = ref(false);
// Computed block filter
const filteredBlocks = computed(() => {
    if (!searchTrigger.value || !searchQuery.value.trim()) return {};

    const query = searchQuery.value.toLowerCase();
    const result = {};

    for (const [category, items] of Object.entries(blockObj.value || {})) {
        if (!Array.isArray(items)) continue;

        const matched = items.filter((item) => item?.label && typeof item.label === "string" && item.label.toLowerCase().includes(query));

        if (matched.length) result[category] = matched;
    }

    return result;
});

function handleSearchKey(e) {
    if (e.key === "Enter") {
        searchTrigger.value = true;
    }
}

watch(() => {
    console.log("nodes.value", nodes.value);
});

function handleClearSearch() {
    searchQuery.value = "";
    searchTrigger.value = false;
}
</script>
<template>
    <router-view></router-view>
    <div class="h-screen w-screen flex flex-col">
        <div class="relative flex justify-end gap-1">
            <!-- save and fetch flow buttons -->
            <div class="flex gap-1 fixed top-2 end-2 z-50">
                <!-- <input
                        v-model="flowId"
                        class="px-2 h-8 font-medium rounded-md hover:shadow-lg transition-all border border-slate-200 focus:outline outline-slate-900 w-96 p-1"
                        placeholder="Enter Flow ID" /> -->
                <button @click="fetchFlow(flowId)" class="px-4 h-8 font-medium rounded-md hover:shadow-lg transition-all border border-slate-200 bg-slate-900 text-white">Fetch-Flow</button>
                <button @click="saveFlow" class="px-4 h-8 font-medium rounded-md hover:shadow-lg transition-all border border-slate-200 bg-slate-900 text-white">Save</button>
                <!-- run button -->
                <button type="button" class="flex justify-center items-center px-4 h-8 font-medium rounded-md hover:shadow-lg transition-all border border-slate-200 bg-slate-900 text-white">
                    <span class=""><i class="hgi-stroke hgi-sharp hgi-play"></i></span>Run
                </button>
            </div>

            <div class="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
                <button @click="showBlock = !showBlock" class="px-4 h-8 rounded-md font-medium bg-slate-900 text-white hover:shadow-lg transition-all flex items-center gap-2">
                    <span v-if="showBlock">
                        <i class="hgi hgi-stroke hgi-minus-sign"></i>
                    </span>
                    <span v-else>
                        <i class="hgi hgi-stroke hgi-add-01"></i>
                    </span>
                    {{ showBlock ? "Block" : "Block" }}
                </button>
            </div>
            <!-- Block UI, shown when showBlock is true -->
            <div
                v-if="showBlock"
                class="gap-2 p-1 fixed bottom-40 left-1/2 transform -translate-x-1/2 max-h-96 overflow-y-auto max-w-lg z-50 bg-white rounded-md border border-slate-200 shadow-xl w-full">
                <div class="flex justify-between px-2">
                    <p class="font-medium text-lg p-1">Blocks</p>
                </div>
                <hr />

                <!-- Search Input -->
                <div class="flex justify-center items-center rounded-md px-2 py-2">
                    <input
                        v-model="searchQuery"
                        @keyup="handleSearchKey"
                        type="text"
                        placeholder="Search for blocks"
                        class="px-2 h-8 rounded-md font-medium hover:shadow-lg transition-all border border-slate-200 focus:outline outline-slate-900 w-full" />
                </div>

                <!-- Search Results -->
                <div v-if="searchTrigger && searchQuery.trim()">
                    <div v-if="Object.keys(filteredBlocks.value || {}).length">
                        <div v-for="(items, category) in filteredBlocks.value" :key="category" class="text-start font-medium">
                            <h3 class="font-medium px-2">{{ category }}</h3>
                            <div class="px-2 py-1">
                                <p
                                    v-for="item in items"
                                    :key="item.label"
                                    class="flex justify-start items-center px-2 h-8 border border-slate-200 rounded-md font-medium hover:shadow-lg transition-all cursor-pointer"
                                    @click="
                                        () => {
                                            item.method?.();
                                            handleClearSearch();
                                        }
                                    ">
                                    {{ item.label }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p v-else class="text-rose-500 py-1">No matching results found.</p>
                </div>

                <div class="font-medium rounded-md">
                    <!-- Loop through blockObj dynamically -->
                    <div v-for="(items, category) in blockObj" :key="category" class="flex flex-col px-2">
                        <!-- Category Header with Toggle Button -->
                        <div class="flex gap-2 p-1 rounded-md cursor-pointer">
                            <button class="px-2 h-6 rounded-md font-medium border border-slate-200 hover:shadow-lg transition-all flex items-center" @click="toggleSection(category)">
                                <i v-if="activeSection === category" class="hgi hgi-stroke hgi-minus-sign"></i>
                                <i v-else class="hgi hgi-stroke hgi-add-01"></i>
                            </button>
                            <p class="font-medium h-6">{{ category }}</p>
                        </div>
                        <!-- Labels List (Visible when expanded) -->
                        <div v-if="activeSection === category" class="grid grid-cols-3 px-4 text-center gap-2">
                            <p
                                v-for="item in items"
                                :key="item.label"
                                class="h-8 flex justify-center items-center rounded-md font-medium hover:shadow-lg transition-all border border-slate-200 cursor-pointer"
                                @click="
                                    () => {
                                        item.method(item.type);
                                        handleButtonClick();
                                    }
                                ">
                                {{ item.label }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border border-slate-200 w-full h-full rounded-md overflow-hidden">
            <VueFlow
                v-model:nodes="nodes"
                v-model:edges="edges"
                @edge-click="removeEdge"
                :node-types="{
                    custom: CustomNode,
                    inputBlock: InputBlock,
                    outputBlock: OutputBlock,
                    conditionBlock: ConditionBlock,
                    ifBlock: IfBlock,
                    evaluateBlock: EvaluateBlock,
                    delayBlock: DelayBlock,
                    repeat: Repeat,
                    forBlock: ForBlock,
                    collectBlock: CollectBlock,
                    displayBlock: DisplayBlock,
                    logBlock: LogBlock,
                    stringBlock: StringBlock,
                    booleanBlock: BooleanBlock,
                    numberBlock: NumberBlock,
                    nullBlock: NullBlock,
                    selectBlock: SelectBlock,
                    nowBlock: NowBlock,
                    dateBlock: DateBlock,
                    dateTimeBlock: DateTimeBlock,
                    templateBlock: TemplateBlock,
                    httpRequestBlock: HttpRequestBlock,
                    createBlock: CreateVariableBlock,
                    getVariableBlock: GetVariable,
                    aiRequestBlock: AiRequest,
                    listBlock: ListBlock,
                    recordBlock: RecordBlock,
                    dynamicBlock: DynamicBlock,
                    flowBlock: FlowBlock,
                    createProcessor: Processor,
                    validateBlock: ValidateBlock,
                    javaCodeBlock: JavaCode,
                }"
                @connect="onConnect">
                <Background />
                <MiniMap />
                <Controls class="border border-slate-200 rounded-md flex"> </Controls>
            </VueFlow>
        </div>
    </div>
</template>
