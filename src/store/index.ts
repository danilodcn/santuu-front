import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { ICoverage } from "@/types/proposal";

Vue.use(Vuex);

export enum MutationTypes {
  CHANGE_COVERAGES = "CHANGE_COVERAGES",
  CHANGE_ENABLED = "CHANGE_ENABLED",
  TOGGLE_DIALOG = "TOGGLE_DIALOG",
  TOGGLE_LOADING = "TOGGLE_LOADING",
}

export interface IDialog {
  msg: string;
  active: boolean;
  title: string;
  bntClose: boolean;
  persistent: boolean;
}

const state = {
  dialog: {
    msg: "",
    active: false,
    title: "",
    bntClose: false,
    persistent: false,
  } as IDialog,
  proposal_coverages: [] as ICoverage[],
  loading: false,
};

export type RootState = typeof state;

interface ISwitchToEnable {
  index: number;
  enabled: boolean;
}

const mutations: MutationTree<RootState> = {
  [MutationTypes.TOGGLE_DIALOG](state, payload: IDialog) {
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

  [MutationTypes.TOGGLE_LOADING](state, payload: boolean) {
    console.log(payload);
    state.loading = !state.loading;
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {},
});
