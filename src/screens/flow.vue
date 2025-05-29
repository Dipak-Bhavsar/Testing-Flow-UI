<script setup>
import { onBeforeMount, ref } from "vue";
import Canvas from "../components/Flow/Canvas.vue";
import Header from "../components/Flow/Header.vue";
import JavaCodeEditor from "../components/Flow/JavaCodeEditor.vue";
import NewBlockModal from "../components/Flow/NewBlockModal.vue";
import { generateUUID } from "../utils/helpers";

window.javaCodeEditorOptions = ref({
    isJavaCodeEditor: false,
    value: "",
});

onBeforeMount(async () => {
    const response = await fetch("http://localhost:8080/vue-flow/getFlow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flowId: getQueryParam("id") }), // Needs JSON.stringify
    });

    const data = await response.json(); // You must parse the JSON

    console.log("response >>> ", data);
    window.nodes.value = data.nodes;
    window.edges.value = data.edges;
    window.valueJson = data.valueJson;
});

window.nodes = ref([
    {
        id: generateUUID(),
        type: "web",
        position: { x: 100, y: 200 },
        data: { label: "web Driver" },
    },
]);
window.edges = ref([]);
window.valueJson = ref({});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
</script>

<template>
    <Header />
    <NewBlockModal />
    <Canvas />
    <JavaCodeEditor />
</template>
