import { defineStore } from "pinia";
import { ref } from "vue";
import { generateUUID } from "../utils/helpers";

export const useNodeStore = defineStore("nodeStore", () => {
    function addNode(type) {
        const newNode = {
            id: generateUUID(),
            type,
            position: { x: Math.random() * 400, y: Math.random() * 300 },
            data: { label: `${type}`, onRemove: (id) => removeNodeById(id) },
        };
        nodes.value.push(newNode);
        console.log("🆕 New node created with ID:", newNode.id);
    }

    const centerPoint = ref({ x: 0, y: 0 });

    function setCenterPoint(newCenter) {
        centerPoint.value = newCenter;
    }

    const selectedNodeId = ref("");

    function setSelectedNodeId(newId){
        selectedNodeId.value = newId;
    }

    return { nodes, addNode, centerPoint, setCenterPoint, selectedNodeId, setSelectedNodeId };
    
});
