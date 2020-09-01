import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import app from "./modules/app";
import admin from "./modules/admin";
import kanban from "./modules/kanban";
import kpt from "./modules/kpt";

if (process.env.NODE_ENV === "development") {
    Vue.use(Vuex);
}

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        app,
        admin,
        kanban,
        kpt
    },
    strict: debug
    // plugins: debug ? [createLogger()] : []
});
