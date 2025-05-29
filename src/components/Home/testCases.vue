<script>
import { computed, onBeforeMount, onMounted } from "vue";
import { testCaseStore } from "../../store";
const addTestCase = testCaseStore((state) => state.addTestCase);
const getTestCase = testCaseStore((state) => state.getTestCase);
const setTestCase = testCaseStore((state) => state.setTestCase);
const removeTestCase = testCaseStore((state) => state.removeTestCase);

const testCase = computed(() => getTestCase() || {});

onBeforeMount(() => {
    setTestCase({
        1: { name: "Test Case 1", valueJson: {}, nodes: [], edges: [] },
        2: { name: "Test Case 2", valueJson: {}, nodes: [], edges: [] },
        3: { name: "Test Case 3", valueJson: {}, nodes: [], edges: [] },
    });
});
onMounted(() => {
    console.log(testCase.value);
});
</script>

<template>
    <div>
        <div id="test-case-list" ref="testCaseList" class="flex flex-col gap-2">
            <div class="test-case h-8 px-4 rounded-md hover:shadow-lg flex items-center justify-between border border-slate-200" v-for="(value, key, index) of testCase" :key="index">
                <RouterLink :to="`/testCaseBuilder/${key}`" class="flex-1">
                    <span class="font-medium">{{ value?.name }}</span>
                </RouterLink>
                <Button type="primary-square" class="" @click="removeTestCase(key)">
                    <span class="text-base"> <i class="hgi-stroke hgi-delete-02"></i></span>
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
