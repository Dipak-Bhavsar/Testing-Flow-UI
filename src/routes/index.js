import { createRouter, createWebHistory } from "vue-router";
import Flow from "../screens/flow.vue";
import Home from "../screens/home.vue";
import Query from "../screens/query.vue";
import Settings from "../screens/settings.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/query", component: Query },
    { path: "/settings", component: Settings },
    { path: "/flow", component: Flow },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
