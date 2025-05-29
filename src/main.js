import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { router } from "./routes/index";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
Object.assign(app.config.globalProperties, {
    window: window,
});
app.use(pinia);
app.mount("#app");
// createApp(App).mount('#app')
