<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
    <nav class="h-10 bg-slate-900 w-full flex items-center gap-2">
        <RouterLink to="/" class="text-white">Home</RouterLink>
        <RouterLink to="/settings" class="text-white">Settings</RouterLink>
        <!-- <RouterLink to="/testCaseBuilder" class="text-white">Test Case Builder</RouterLink> -->
    </nav>
</template>
