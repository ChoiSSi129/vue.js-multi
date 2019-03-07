import Vue from 'vue'
import App from './components/TodoList'
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store, // Store 객체 주입
  render: h => h(App),
}).$mount('#app')
