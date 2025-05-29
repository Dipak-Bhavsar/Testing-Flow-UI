<script setup>
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { useVueFlow, VueFlow } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import { onMounted, ref, watch } from "vue";
import blockType from "../../constants/block.type";
import { generateUUID } from "../../utils/helpers";
import { useNodeStore } from "/src/stores/nodeStore";
const { addEdges, removeEdges, removeNodes } = useVueFlow();

const flowStore = useNodeStore();

const flowContainer = ref(null);
const fullFlowSize = ref({ width: 0, height: 0 });
const lastZoom = ref(1);
const centerPoint = ref({ x: 0, y: 0 });

const { viewport } = useVueFlow();

function updateFullFlowSize() {
    if (!flowContainer.value) return;

    const containerRect = flowContainer.value.getBoundingClientRect();
    const canvasWidth = containerRect.width / viewport.value.zoom;
    const canvasHeight = containerRect.height / viewport.value.zoom;

    fullFlowSize.value = { width: canvasWidth, height: canvasHeight };

    updateCenterPoint(containerRect);
}

function updateCenterPoint(containerRect) {
    if (!containerRect) return;

    // Calculate center of visible container in screen coords (pixels)
    const centerScreenX = containerRect.width / 2;
    const centerScreenY = containerRect.height / 2;

    const canvasCenterX = centerScreenX / viewport.value.zoom - viewport.value.x;
    const canvasCenterY = centerScreenY / viewport.value.zoom - viewport.value.y;
    flowStore.setCenterPoint({ x: canvasCenterX, y: canvasCenterY });
}

onMounted(() => {
    updateFullFlowSize();
    window.addEventListener("resize", updateFullFlowSize);
});

watch(
    () => viewport.value.zoom,
    (newZoom) => {
        lastZoom.value = newZoom;
        if (flowContainer.value) {
            const containerRect = flowContainer.value.getBoundingClientRect();
            updateFullFlowSize();
            updateCenterPoint(containerRect);
        }
    }
);

watch(
    () => [viewport.value.x, viewport.value.y],
    () => {
        if (flowContainer.value) {
            const containerRect = flowContainer.value.getBoundingClientRect();
            updateCenterPoint(containerRect);
        }
    }
);

const removeEdge = (event) => {
    const edgeId = event.edge.id;
    removeEdges([edgeId]);
    // console.log("Removed Edge ID:", edgeId);
};

const getSelectedNode = (event) => {
    const nodeId = event.node.id;
    flowStore.setSelectedNodeId(nodeId);
    // console.log("Selected Node ID:", nodeId);
};

const nodes = window.nodes;
const edges = window.edges;

const onConnect = (connection) => {
    const newEdge = {
        ...connection,
        id: generateUUID(),
        animated: true,
        style: { stroke: "#0f172a", strokeWidth: 2 },
        markerEnd: "arrowclosed",
        labelStyle: { fill: "#0f172a", background: "black", padding: "4px", fontSize: "10px", borderRadius: "50%" },
    };
    addEdges([newEdge]); // Add edge to Vue Flow
    // console.log("New Edge JSON With id:", newEdge.id, JSON.stringify(newEdge, null, 3));
    // console.log("In OnConnect, New Edge:", newEdge);

};
window.removeNodeByIdVueFlow = (id) => {
    removeNodesFn?.([id]);
};
</script>
<template>
    <div ref="flowContainer" class="border border-slate-200 w-full h-full rounded-md overflow-hidden">
        <VueFlow 
            v-model:nodes="nodes"  
            v-model:edges="edges" 
            @edge-click="removeEdge"
            @node-click="getSelectedNode"
            :node-types="blockType" 
            @connect="onConnect" 
            :default-viewport="{ zoom: 0.8 }" 
            :max-zoom="4" 
            :min-zoom="0.1">
            <Background />
            <MiniMap />
            <Controls class="border border-slate-200 rounded-md flex" />
        </VueFlow>
    </div>
</template>
