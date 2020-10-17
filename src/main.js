import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import publicFn from "./publicFn/publicFn";

Vue.config.productionTip = false


const url = process.env.VUE_APP_URL;
Vue.prototype.$url = url;
Vue.prototype.$publicFn = publicFn;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')