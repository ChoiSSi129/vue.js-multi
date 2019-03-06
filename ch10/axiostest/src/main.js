import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

axios.get("/api/contacts_long", {
  params: {pageno:1, pagesize:5}
})
.then(function(res){
  console.log(res);
}).catch(function(err){
  console.log(err);
});

// axios.post("/api/contacts", {
//   name: "홀길동", tel:"123124124", address: "asfafsdgdfgdfg"
// })
// .then((res) => {
//   console.log(res.data);
// });

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
