<script setup>
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { generateUUID } from "../../../utils/helpers";


// Define props properly
const props = defineProps({
    id: String,
    data: Object, // The node object containing id, type, and data
    // removeBlock: Function, // Function to remove the block
});
const collectBlockData = ref({
    id: generateUUID(),
    condition: "",
});

watch(
    collectBlockData,
    (newValues) => {
        window.valueJSON[props.id] = newValues;
        console.log("Updated CollectBlock Value:", window.valueJSON);
    },
    { deep: true }
);

onMounted(() => {
    collectBlockData.value = window.valueJson[props.id] || { condition: "" };
    console.log("collect Block id : ", props.id);
});

const searchQuery = ref(""); // Stores user input
const List = ref([]);
// Computed property to filter data based on search input
const filteredData = computed(() => {
    return List.value.filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
// Reactive state for toggling sections
const activeSection = ref(null); // Keeps track of the currently active section

const toggleSection = (section) => {
    activeSection.value = activeSection.value === section ? null : section;
};

// Example data for each section
const actions = ["HTTP Request", "AI-Request"];
const logic = ["Condition", "If", "Evaluate", "Delay"];
const looping = ["Repeat", "For", "Collect"];
const Visualizes = ["Display", "Log"];
const Data = ["String", "Bool", "Number", "Null", "Select", "Now", "Date", "Date & Time", "List", "Record", "Create Variable", "Get Variable", "Template"];
const Other = ["Group"];
</script>
<template>
    <div class="h-auto w-96 bg-white rounded p-1 shadow-lg">
        <div class="flex justify-start">
            <!-- Use optional chaining to avoid undefined error -->
            <button  @click="removeBlock(node.id)">
                <span class="text-start px-1 font-semibold text-red-700"><i class="hgi-stroke hgi-delete-02"></i></span>
            </button>
        </div>
        <div class="flex justify-center items-center gap-1 p-1">
            <!-- <label for="search" class="text-sm flex justify-center items-center">Search</label> -->
            <input id="search" v-model="searchQuery" type="text" placeholder="Type to search..." class="bg-slate-200 hover:bg-slate-300 w-full rounded p-1 text-sm" />
            <button class="bg-slate-800 hover:bg-slate-600 text-white rounded px-3 py-1 text-sm">Search</button>
        </div>

        <div class="font-semibold text-black">
            <!-- Condition Section -->
            <div class="flex flex-col">
                <div class="flex gap-1 mt-1 p-1">
                    <button class="hover:bg-slate-300 px-1 rounded" @click="toggleSection('action')">+</button>
                    <p>Actions</p>
                </div>
                <div v-if="activeSection === 'action'" class="m-1">
                    <p v-for="item in actions" :key="item" class="bg-slate-100 m-0.5 p-0.5 rounded hover:bg-slate-200 text-start">{{ item }}</p>
                </div>
            </div>

            <!-- Loop Section -->
            <div class="flex flex-col">
                <div class="flex gap-1 mt-1 p-1">
                    <button class="hover:bg-slate-300 px-1 rounded" @click="toggleSection('logic')">+</button>
                    <p>Logic</p>
                </div>

                <div v-if="activeSection === 'logic'" class="m-1">
                    <p v-for="item in logic" :key="item" class="bg-slate-100 m-0.5 p-0.5 rounded hover:bg-slate-200 text-start">{{ item }}</p>
                </div>
            </div>

            <!-- looping Section -->
            <div class="flex flex-col">
                <div class="flex gap-1 mt-1 p-1">
                    <button class="hover:bg-slate-300 px-1 rounded" @click="toggleSection('looping')">+</button>
                    <p>Looping</p>
                </div>
                <div v-if="activeSection === 'looping'" class="m-1">
                    <p v-for="item in looping" :key="item" class="bg-slate-100 m-0.5 p-0.5 rounded hover:bg-slate-200 text-start">{{ item }}</p>
                </div>
            </div>

            <!-- Visualize Section -->
            <div class="flex flex-col">
                <div class="flex gap-1 mt-1 p-1">
                    <button class="hover:bg-slate-300 px-1 rounded" @click="toggleSection('Visualize')">+</button>
                    <p>Visualize</p>
                </div>
                <div v-if="activeSection === 'Visualize'" class="m-1">
                    <p v-for="item in Visualizes" :key="item" class="bg-slate-100 m-0.5 p-0.5 rounded hover:bg-slate-200 text-start">{{ item }}</p>
                </div>
            </div>

            <!-- Data Section -->
            <div class="flex flex-col">
                <div class="flex gap-1 mt-1 p-1">
                    <button class="hover:bg-slate-300 px-1 rounded" @click="toggleSection('data')">+</button>
                    <p>Data</p>
                </div>
                <div v-if="activeSection === 'data'" class="m-1">
                    <p v-for="item in Data" :key="item" class="bg-slate-100 m-0.5 p-0.5 rounded hover:bg-slate-200 text-start">{{ item }}</p>
                </div>
            </div>

            <!-- Other Section -->
            <div class="flex flex-col">
                <div class="flex gap-1 mt-1 p-1">
                    <button class="hover:bg-slate-300 px-1 rounded" @click="toggleSection('other')">+</button>
                    <p>Other</p>
                </div>
                <div v-if="activeSection === 'other'" class="m-1">
                    <p v-for="item in Other" :key="item" class="bg-slate-100 m-0.5 p-0.5 rounded hover:bg-slate-200 text-start">{{ item }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.for-left {
    width: 14px;
    height: 14px;
    top: 62px;
    left: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
.for-right {
    width: 14px;
    height: 14px;
    top: 62px;
    right: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
.forStart-right {
    width: 14px;
    height: 14px;
    top: 106px;
    right: -2px;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    background-color: #f97316;
}
</style>
