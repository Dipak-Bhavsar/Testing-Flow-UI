<script setup>
import { onMounted, ref } from "vue";

const popupMessage = ref("");
const showPopup = ref(false);
let popupTimeout = null;
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.41:8080";
const saveFlow = async () => {
    const flowData = {
        id: getQueryParam("id"),
        nodes: nodes.value,
        edges: edges.value,
        valueJson: window.valueJson,
    };

    try {
        const response = await fetch("http://localhost:8080/vue-flow/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flowData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // console.log("Flow JSON:", JSON.stringify(flowData));

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            console.log("Flow saved successfully with ID:", result.id);
            window.flowId = result.id;
            // ✅ Show success message
            showPopupMessage("✅ Flow saved successfully!");
        } else {
            const text = await response.text();
            console.log("Flow saved (non-JSON response):", text);
            showPopupMessage("✅ Flow saved (non-JSON response)");
        }
    } catch (error) {
        console.error("Error saving flow:", error);
        showPopupMessage("❌ Failed to save flow", 4000);
    }
};

const showPopupMessage = (message, duration = 3000) => {
    popupMessage.value = message;
    showPopup.value = true;
    if (popupTimeout) clearTimeout(popupTimeout);

    popupTimeout = setTimeout(() => {
        showPopup.value = false;
        popupMessage.value = "";
    }, duration);
};

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const fetchFlow = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/vue-flow/${id}`);
        if (!response.ok) {
            if (response.status === 404) throw new Error("Flow not found");
            throw new Error("Failed to fetch flow");
        }

        const data = await response.json();
        nodes.value = data.nodes || [];
        edges.value = data.edges || [];
        window.valueJson = data.valueJson || {};
        console.log("Flow fetched successfully:", data);
    } catch (error) {
        console.error("Error fetching flow:", error);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const flowId = urlParams.get("id");

    if (flowId) {
        fetchFlow(flowId);
    } else {
        console.warn("No flow ID provided in URL");
    }
});

onMounted(() => {
    const flowId = getQueryParam("id");
    if (flowId) {
        fetchFlow(flowId);
    }
});
</script>

<template>
    <!-- save and fetch flow buttons -->
    <div class="flex gap-1 fixed top-2 end-2 z-50">
        <!-- <input
                type="text"
                class="border border-slate-200 rounded-md px-4 h-8 bg-white flex-1 focus:outline outline-slate-900 hover:shadow-lg transition-all"
                placeholder="Enter Flow ID"
                v-model="flowId" />
            <button @click="fetchFlow(flowId)" class="bg-slate-900 text-white rounded-md hover:shadow-lg transition-all px-4 h-8 font-medium">Fetch-Flow</button> -->
        <button
            @click="saveFlow"
            type="button"
            class="flex justify-center items-center gap-2 px-4 h-8 font-medium rounded-md hover:shadow-lg transition-all border border-slate-200 bg-slate-900 text-white">
            <span class="text-base"> <i class="hgi hgi-stroke hgi-floppy-disk"></i></span>
            <span> Save </span>
        </button>
        <button type="button" class="flex justify-center items-center gap-2 px-4 h-8 font-medium rounded-md hover:shadow-lg transition-all border border-slate-200 bg-slate-900 text-white">
            <span class="text-base"> <i class="hgi-stroke hgi-sharp hgi-play"></i></span>
            <span> Run </span>
        </button>
    </div>
    <!-- Centered bottom popup message -->
    <div
        v-if="showPopup"
        :class="['fixed bottom-14 left-[42%] -translate-x-1/2 px-4 py-2 rounded-md shadow-lg z-50 animate-bounce', popupType === 'error' ? 'bg-red-600' : 'bg-slate-900', 'text-white']">
        {{ popupMessage }}
    </div>
</template>
