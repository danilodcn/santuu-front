import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { ICoverage } from "@/types/proposal";

Vue.use(Vuex);

export enum MutationTypes {
  TOGGLE_DIALOG = "TOGGLE_DIALOG",
  CHANGE_COVERAGES = "CHANGE_COVERAGES",
  CHANGE_ENABLED = "CHANGE_ENABLED",
}

const state = {
  dialog: {
    msg: "",
    active: false,
    title: "",
    bntClose: false,
    persistent: false,
  },
  proposal_coverages: [] as ICoverage[],
};

export type RootState = typeof state;

interface ISwitchToEnable {
  index: number;
  enabled: boolean;
}

const mutations: MutationTree<RootState> = {
  [MutationTypes.TOGGLE_DIALOG](state, payload) {
    state.dialog = {
      ...state.dialog,
      ...payload,
    };
  },
  [MutationTypes.CHANGE_COVERAGES](state, payload) {
    state.proposal_coverages = payload;
  },
  [MutationTypes.CHANGE_ENABLED](state, payload: ISwitchToEnable) {
    state.proposal_coverages[payload.index].enabled = payload.enabled;
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {},
});
