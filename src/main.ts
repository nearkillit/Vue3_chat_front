import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { StateKey, store } from "./store";

createApp(App).use(store, StateKey).use(router).mount("#app");
