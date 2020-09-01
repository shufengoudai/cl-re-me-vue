//import { setStore } from "../../utils/store";
import * as types from "../mutation-types";

const state = {
    task: {
        taskName: "",
        taskOwner: "",
        storyId: "",
        id: "",
        taskStatus: ""
    }
};

// getters
const getters = {
    task: state => state.task
};

// actions
const actions = {
    CreateTask({ commit }, newTask) {
        commit(types.CREATE_TASK, newTask);
    },
    UpdateTask({ commit }, updateTask) {
        commit(types.UPDATE_TASK_STATUS, updateTask);
    },
    ViewTask({ commit }, viewTask) {
        commit(types.VIEW_TASK, viewTask);
    }
};

// mutations
const mutations = {
    [types.CREATE_TASK](state, newTask) {
        state.task.taskName = newTask.taskName;
        state.task.taskOwner = newTask.taskOwner;
        state.task.storyId = newTask.storyId;
        //setStore("kanNewTask", newTask, 1);
    },
    [types.UPDATE_TASK_STATUS](state, updateTask) {
        state.task.id = updateTask.taskId;
        state.task.taskStatus = updateTask.taskStatus;
        //setStore("kanNewTask", newTask, 1);
    },
    [types.VIEW_TASK](state, viewTask) {
        state.task.id = viewTask.taskId;
        //setStore("kanNewTask", newTask, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
