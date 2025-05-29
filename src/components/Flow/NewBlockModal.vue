<script setup>
import { useVueFlow } from "@vue-flow/core";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import blockType from "../../constants/block.type";
import processorList from "../../dummyData/processorList";
import seleniumWebElement from "../../dummyData/seleniumWebElement";
import { generateUUID } from "../../utils/helpers";
import { useNodeStore } from "/src/stores/nodeStore";
const { getNodes, updateNode } = useVueFlow();

const flowStore = useNodeStore();

const route = useRoute();
const showBlock = ref(false);
const activeSection = ref(null); // Keeps track of the currently active section
const searchQuery = ref("");

const nodes = window.nodes;
const edges = window.edges;
const flowIdentity = route.query;

// Example data for each section
const blockObj = ref({
    Request: [
        { label: "HTTP Request", type: "httpRequest" },
        { label: "AI-Request", type: "aiRequest" },
        { label: "Flow-Block", type: "flow" },
    ],
    Trigger: [
        { label: "Input", type: "in" },
        { label: "Output", type: "out" },
    ],
    Logic: [
        { label: "Condition", type: "condition" },
        { label: "Validate", type: "validate" },
        { label: "If-Block", type: "if" },
        { label: "Evaluate", type: "evaluate" },
        { label: "Delay", type: "delay" },
    ],
    Looping: [
        { label: "Repeat", type: "repeat" },
        { label: "For", type: "for" },
        { label: "Collect", type: "collect" },
    ],
    // Visualize: [
    //     { label: "Display", type: "display" },
    //     { label: "Log", type: "log" },
    // ],
    Data: [
        { label: "String", type: "string" },
        { label: "Bool", type: "boolean" },
        { label: "Number", type: "number" },
        { label: "Null", type: "null" },
        { label: "Select", type: "select" },
        { label: "Now", type: "now" },
        { label: "Date", type: "date" },
        { label: "Date & Time", type: "dateTime" },
        { label: "Json", type: "json" },
        { label: "Create variable", type: "create" },
        { label: "Get variable", type: "getVariable" },
        { label: "Template", type: "template" },
    ],
    SeleniumAction: Object.keys(processorList).map((item) => ({
        label: item,
        type: "processor",
        processorType: item,
        source: "SeleniumAction",
    })),

    SeleniumWebElement: Object.keys(seleniumWebElement).map((item) => ({
        label: item,
        type: "processor",
        processorType: item,
        source: "seleniumWebElement",
    })),

    // Other: [
    //     {
    //         label: "Dynamic Block",
    //         type: "dynamic",
    //     },
    //     {
    //         label: "Java Code Editor",
    //         type: "javaCode",
    //     },
    // ],
});

const toggleSection = (section) => {
    activeSection.value = activeSection.value === section ? null : section;
};

const createBlock = ({ type, processorType, source, ...rest }) => {
    showBlock.value = false;
    const component = blockType[type];
    if (!component) {
        console.error(`Block type "${type}" not found in nodeTypes.`);
        return;
    }
    // Select the correct config source
    const configSource = source === "SeleniumAction" ? processorList : source === "seleniumWebElement" ? seleniumWebElement : {};
    const baseConfig = structuredClone(configSource[processorType] || {});

    // const lastNode = nodes.value[nodes.value.length - 1];
    // const newX = lastNode ? lastNode.position.x + 400 : Math.random() * 300;
    // const newY = lastNode ? lastNode.position.y : Math.random() * 500;

    const newNodeId = generateUUID();
    const newNode = {
        id: newNodeId,
        position: {
            x: flowStore.centerPoint.x,
            y: flowStore.centerPoint.y,
        },
        type,
        data: {
            label: type,
            processorType,
            source,
            ...baseConfig,
            ...rest,
        },
    };

    // ✅ Add default node data to window.valueJson
    if (!window.valueJson) {
        window.valueJson = {};
    }
    window.valueJson[newNodeId] = {
        processorType,
        source,
    };
    nodes.value.push(newNode);
    searchQuery.value = "";
    console.log("Created new block : ", window.valueJson[newNodeId]);
};

const nodeGap = 420;
const startX = 100;
const startY = 200; // desired Y position for alignment

const rearrangeFlow = () => {
    const sortedNodes = [...nodes.value].sort((a, b) => a.position.x - b.position.x);
    sortedNodes.forEach((node, index) => {
        node.position = {
            x: startX + index * nodeGap,
            y: startY,
        };
    });
};

// const createBlock = ({ type, ...rest }) => {
//     showBlock.value = false;
//     const component = blockType[type];
//     if (!component) {
//         console.error(`Block type "${type}" not found in nodeTypes.`);
//         return;
//     }

//     const lastNode = nodes.value[nodes.value.length - 1];
//     const newX = lastNode ? lastNode.position.x + 400 : Math.random() * 300;
//     const newY = lastNode ? lastNode.position.y : Math.random() * 500;

//     const newNodeId = generateUUID();
//     const newNode = {
//         id: newNodeId,
//         position: { x: newX, y: newY },
//         type,
//         data: {
//             label: type,
//             ...rest,
//         },
//     };
//     nodes.value.push(newNode);
//     searchQuery.value = "";
// };

const filteredBlocks = computed(() => {
    if (!searchQuery.value.trim()) {
        return {};
    }
    const query = searchQuery.value.toLowerCase();
    const result = {};
    Object.keys(blockObj.value).forEach((category) => {
        const filteredItems = blockObj.value[category].filter((item) => item.label && item.label.toLowerCase().includes(query));
        if (filteredItems.length) {
            result[category] = filteredItems;
        }
    });

    return result;
});
</script>

<template>
    <!-- Block UI, shown when showBlock is true -->
    <div v-if="showBlock" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-[9999]">
        <div class="flex flex-col gap-2 p-1 bg-white rounded-xl border border-slate-200 w-full max-w-5xl max-h-[80vh]">
            <div class="flex items-center justify-between px-2">
                <p class="font-medium text-sm">Blocks</p>
                <button @click="showBlock = false" class="size-8 rounded-md border border-transparent hover:shadow-lg hover:border-slate-200 transition-all">
                    <span class="text-base"><i class="hgi hgi-stroke hgi-cancel-01"></i></span>
                </button>
            </div>
            <hr />
            <!-- Search Box -->
            <div class="flex justify-center items-center rounded-md px-2 py-2">
                <input
                    id="search"
                    v-model="searchQuery"
                    type="text"
                    placeholder="search for blocks"
                    class="px-2 h-8 rounded-md font-medium hover:shadow-lg transition-all border border-slate-200 focus:outline outline-slate-900 w-full" />
            </div>

            <div class="flex flex-col gap-2 flex-1 overflow-y-auto">
                <!-- Display results only when search query is not empty -->
                <div v-if="searchQuery.trim()">
                    <div v-if="Object.keys(filteredBlocks).length">
                        <div v-for="(items, category) in filteredBlocks" :key="category" class="text-start font-medium">
                            <h3 class="font-medium px-2">{{ category }}</h3>
                            <div class="px-2 py-1 grid grid-cols-3 text-center gap-2">
                                <button
                                    v-for="item in items"
                                    :key="item.label"
                                    class="flex justify-start items-center px-2 h-8 border border-slate-200 rounded-md font-medium hover:shadow-lg transition-all cursor-pointer"
                                    @click="createBlock(item)">
                                    {{ item.label }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- If no results were found -->
                    <p v-else class="text-rose-500 py-1">No matching results found.</p>
                </div>

                <div class="font-medium rounded-md">
                    <!-- Loop through blockObj dynamically -->
                    <div v-for="(items, category) in blockObj" :key="category" class="flex flex-col px-2">
                        <!-- Category Header with Toggle Button -->
                        <div class="flex gap-2 p-1 rounded-md cursor-pointer">
                            <button class="px-2 h-8 w-full rounded-md font-medium border border-slate-200 transition-all flex items-center gap-2" @click="toggleSection(category)">
                                <i v-if="activeSection === category" class="hgi hgi-stroke hgi-minus-sign"></i>
                                <i v-else class="hgi hgi-stroke hgi-add-01"></i>
                                <p class="font-medium">{{ category }}</p>
                            </button>
                        </div>
                        <!-- Labels List (Visible when expanded) -->
                        <div v-if="activeSection === category" class="grid grid-cols-3 px-4 text-center gap-2">
                            <button
                                v-for="item in items"
                                :key="item.label"
                                class="h-8 flex justify-center items-center rounded-md font-medium hover:shadow-lg transition-all border border-slate-200 cursor-pointer"
                                @click="createBlock(item)">
                                {{ item.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Block Button  -->
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <button @click="showBlock = !showBlock" class="px-4 h-8 rounded-md font-medium bg-slate-900 text-white hover:shadow-lg transition-all flex items-center gap-2">
            <span>
                <i :class="[showBlock ? 'hgi hgi-stroke hgi-minus-sign' : 'hgi hgi-stroke hgi-add-01']"></i>
            </span>
            <span class="">Blocks</span>
        </button>
    </div>
    <div class="fixed left-32 bottom-4 z-50 flex justify-start">
        <button @click="rearrangeFlow" class="px-4 py-2 bg-slate-900 text-white rounded-md hover:shadow-lg transition-all flex items-center gap-2">
            <span><i class="hgi hgi-stroke hgi-arrange"></i></span> Rearrange Flow
        </button>
    </div>
</template>
