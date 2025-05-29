<script setup>
import { computed, reactive } from "vue";
import { browsers, versions } from "../../data/WebDriverData.js";
import Button from "../UI/Button.vue"; // Import Button component

// Reactive array to hold additional fields
const additionalFields = reactive([{ id: Date.now(), browser: "", version: "" }]);

// Handle the Run button click
function handleRunButtonClick() {
    alert("Run button clicked!");
}

// Handle the Stop button click
function handleStopButtonClick() {
    alert("Stop button clicked!");
}

// Handle the Add More Fields button click
function handleAddMoreFieldsClick() {
    additionalFields.push({ id: Date.now(), browser: "", version: "" });
}

// Handle the Remove Field button click
function handleRemoveFieldClick(index) {
    additionalFields.splice(index, 1);
}

// Computed property to get the versions based on selected browser
const getVersions = (browser) => {
    return versions[browser] || [];
};

// Computed property to get the JSON representation of additionalFields
const valueJson = computed(() => {
    return JSON.stringify(additionalFields, null, 2);
});
</script>

<template>
    <div class="flex-1 p-4">
        <!-- Run and Stop Buttons -->
        <div class="flex justify-end mb-4 gap-2">
            <Button type="secondary" @click="handleStopButtonClick" icon="hgi-stroke hgi-cancel-circle"> Stop </Button>
            <Button type="primary" @click="handleRunButtonClick" icon="hgi-stroke hgi-play-circle"> Run </Button>
        </div>

        <!-- Web Driver Section -->
        <div class="border border-slate-200 bg-white shadow-lg rounded-xl p-4 relative flex flex-col gap-4">
            <div class="flex items-center gap-2 justify-between">
                <div class="font-medium text-sm">Web Driver</div>
                <!-- Add More Fields Button -->
                <Button type="secondary-square" class="" icon="hgi-stroke hgi-add-01" @click="handleAddMoreFieldsClick"> </Button>
            </div>

            <!-- Fields -->
            <div class="flex flex-col gap-2">
                <div v-for="(fields, index) in additionalFields" :key="fields.id" class="nodrag bg-white rounded-lg w-full flex items-center gap-4 border border-slate-100 px-4 py-1 text-center">
                    <div class="w-full flex gap-4 items-center">
                        <!-- Browser Select Field -->
                        <div class="grid grid-cols-4 gap-4 items-center w-full">
                            <label :for="`${fields.id}-browser`" class="font-medium">Web Browser</label>
                            <select :id="`${fields.id}-browser`" v-model="fields.browser" class="w-full rounded-md px-2 h-8 focus:outline outline-slate-900 border border-slate-200">
                                <option value="" disabled>Select Browser</option>
                                <option v-for="browser in browsers" :key="browser.value" :value="browser.value">{{ browser.label }}</option>
                            </select>
                            <label :for="`${fields.id}-version`" class="font-medium">Version</label>
                            <select :id="`${fields.id}-version`" v-model="fields.version" class="w-full rounded-md px-2 h-8 focus:outline outline-slate-900 border border-slate-200">
                                <option value="" disabled>Select Version</option>
                                <option v-for="version in getVersions(fields.browser)" :key="version.value" :value="version.value">{{ version.label }}</option>
                            </select>
                        </div>
                        <!-- Remove button for field -->
                        <button class="group-hover:inline-block size-6 rounded-md bg-white hover:text-rose-500 font-medium transition-all" @click="handleRemoveFieldClick(index)">
                            <span class="text-base"> <i class="hgi-stroke hgi-delete-02"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
