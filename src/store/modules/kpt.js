//import { setStore } from "../../utils/store";
import * as types from "../mutation-types";

const state = {
    kpt: {
        id: "",
        kptType: 0
    }
};

// getters
const getters = {
    kpt: state => state.kpt
};

// actions
const actions = {
    UpdateKpt({ commit }, updateKpt) {
        commit(types.UPDATE_KPT, updateKpt);
    },
    cancelKpt({ commit }, cancelKpt) {
        commit(types.CANCEL_KPT, cancelKpt);
    }
};

// mutations
const mutations = {
    [types.UPDATE_KPT](state, updateKpt) {
        state.kpt.id = updateKpt.id;
        state.kpt.kptType = updateKpt.kptType;
        //setStore("kanNewTask", newTask, 1);
    },
    [types.CANCEL_KPT](state, cancelKpt) {
        state.kpt.id = cancelKpt.id;
        state.kpt.kptType = cancelKpt.kptType;
        //setStore("kanNewTask", newTask, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
