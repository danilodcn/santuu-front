import Vue from "vue";
import Vuex, { MutationTree } from "vuex";

Vue.use(Vuex);

export enum MutationTypes {
  TOGGLE_DIALOG = "TOGGLE_DIALOG",
}

const state = {
  dialog: {
    msg: "",
    active: false,
    title: "",
    bntClose: false,
    persistent: false,
  },
};

export type RootState = typeof state;

const mutations: MutationTree<RootState> = {
  [MutationTypes.TOGGLE_DIALOG](state, payload) {
    state.dialog = {
      ...state.dialog,
      ...payload,
    };
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {},
});
