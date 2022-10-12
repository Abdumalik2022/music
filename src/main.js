import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/validate";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import i18n from "./includes/i18n";
import { registerSW } from "virtual:pwa-register";

import "./assets/base.css";
import "./assets/main.css";

registerSW({ immediate: true });

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
