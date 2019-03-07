import Vue from "vue";
import Vuex from "vuex";
import Constant from "../Constant";

// 모든 뷰 컴포넌트에서 Store 접근 가능
// mutations에서 state(현재 상태)와 payload(변경된 상태) 2개의 인자 값으로 사용
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todolist: [
            { id:1, todo:"영화보기", done:false },
            { id:2, todo:"주말 산책", done:true },
            { id:3, todo:"ES6 학습", done:false },
            { id:4, todo:"잠실 야구장", done:false },
        ]
    },
    mutations: {
        [Constant.ADD_TODO]: (state, payload) => {
            if(payload.todo !== ""){
                state.todolist .push({
                    id: new Date().getTime(),
                    todo: payload.todo,
                    done: false
                });
            }
        },
        [Constant.DONE_TOGGLE]: (state, payload) => {
            var index = state.todolist.findIndex((item)=>item.id === payload.id);
            state.todolist[index].done = !state.todolist[index].done;
        },
        [Constant.DELETE_TODO] : (state, payload) => {
            var index = state.todolist.findIndex((item)=>item.id === payload.id);
            state.todolist.splice(index,1);
        }
    }
});

export default store;