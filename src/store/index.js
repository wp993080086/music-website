import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        i:0,
    },
    getters: {
        boardTwo(state) {
            console.log(state.boardClass)
            return state.boardClass;
        },
    },
    mutations: {
        ceshi(state, i){
            state.i = i;
        },
    },
    actions: {},
    modules: {}
});