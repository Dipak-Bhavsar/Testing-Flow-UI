<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { testCaseStore } from "../../store";
import Button from "../UI/Button.vue"; // Import Button component
const addTestCase = testCaseStore((state) => state.addTestCase);
const getTestCase = testCaseStore((state) => state.getTestCase);
const setTestCase = testCaseStore((state) => state.setTestCase);
const removeTestCase = testCaseStore((state) => state.removeTestCase);

const testCase = ref({});

const addCase = () => {
    addTestCase();
    testCase.value = getTestCase();
};
const removeCase = (key) => {
    removeTestCase(key);
    testCase.value = getTestCase();
};

onBeforeMount(() => {
    const testCase = getTestCase();
    const initialTestCase = {
        1: { name: "Test Case 1", valueJson: {}, nodes: [], edges: [] },
        2: { name: "Test Case 2", valueJson: {}, nodes: [], edges: [] },
        3: { name: "Test Case 3", valueJson: {}, nodes: [], edges: [] },
    };
    setTestCase(Object.keys(testCase).length ? testCase : initialTestCase);
});
onMounted(() => {
    console.log("🚀 ~ onMounted ~ getTestCase():", getTestCase());
    testCase.value = getTestCase();
});
</script>

<template>
    <aside class="w-64 h-full border-r border-slate-200 bg-white flex flex-col gap-2 relative p-2">
        <div class="flex items-center justify-between gap-2 w-full">
            <p class="font-medium text-slate-900 text-sm">Test Cases</p>
            <Button type="secondary-square" class="" icon="hgi-stroke hgi-add-01" @click="addCase"> </Button>
        </div>
        <div class="">
            <div id="test-case-list" ref="testCaseList" class="flex flex-col gap-2">
                <div
                    class="test-case h-8 px-2 rounded-md hover:shadow-lg flex items-center justify-between border border-slate-200 group transition-all"
                    v-for="(value, key, index) of testCase"
                    :key="index">
                    <RouterLink :to="`/testCaseBuilder/${key}`" class="flex-1 ml-2">
                        <span class="font-medium">{{ value?.name }}</span>
                    </RouterLink>
                    <button class="hidden group-hover:inline-block size-6 rounded-md bg-white hover:text-rose-500 font-medium transition-all" @click="removeCase(key)">
                        <span class="text-base"> <i class="hgi-stroke hgi-delete-02"></i></span>
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>
