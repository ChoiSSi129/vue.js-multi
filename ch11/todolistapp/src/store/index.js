import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

// 모든 뷰 컴포넌트에서 Store 접근 가능
// mutations에서 state(현재 상태)와 payload(변경된 상태) 2개의 인자 값으로 사용
Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store;