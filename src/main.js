// Imports
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Create the eventBus
export const eventBus = new Vue();

// Create the Vue instance
new Vue({
  render: h => h(App)
}).$mount("#__app_outer");
