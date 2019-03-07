import Constant from "../Constant";
export default {
    [Constant.ADD_TODO]: (store, payload) =>{
        console.log("###addTodo!!!");
        store.commit( Constant.ADD_TODO, payload );
    },
    [Constant.DELETE_TODO] : (store, payload) => {
        console.log("###deleteTodo!!!", payload);
        store.commit(Constant.DELETE_TODO, payload);
    },
    [Constant.DONE_TOGGLE] : ( {commit}, payload ) => {
        console.log("###doneToggle!!!", payload);
        commit(Constant.DONE_TOGGLE, payload);
    }
}