import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import DcForm from "./components/DcForm";
import "ant-design-vue/dist/antd.css";

Vue.use(Antd);
Vue.component("DcForm", DcForm);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
