import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { ICoverage } from "@/types/proposal";

Vue.use(Vuex);

export enum MutationTypes {
  CHANGE_COVERAGES = "CHANGE_COVERAGES",
  CHANGE_ENABLED = "CHANGE_ENABLED",
  TOGGLE_DIALOG = "TOGGLE_DIALOG",
  TOGGLE_LOADING = "TOGGLE_LOADING",
  TOOGLE_PAYMENT_CHOICE = "TOOGLE_PAYMENT_CHOICE",
}

export interface IDialog {
  msg: string;
  active: boolean;
  title: string;
  bntClose: boolean;
  persistent: boolean;
  btnOkCancel?: boolean;
  btnOkOnly?: boolean;
  msgOk?: string;
  msgCancel?: string;
  isResponseOk?: boolean;
  ident?: boolean;
  termsAndConditions?: boolean;
  afterFunction?: (value: boolean) => any;
}

const state = {
  dialog: {
    msg: "",
    active: false,
    title: "",
    bntClose: false,
    persistent: false,
    btnOkCancel: false,
    btnOkOnly: false,
    msgOk: "",
    msgCancel: "",
    isResponseOk: undefined,
    ident: true,
    termsAndConditions: false,
    afterFunction: undefined,
  } as IDialog,
  payment_choice: "",
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

  [MutationTypes.TOGGLE_LOADING](state, payload: boolean | undefined) {
    if (payload == undefined) {
      state.loading = !state.loading;
    } else {
      state.loading = !!payload;
    }
  },

  [MutationTypes.TOOGLE_PAYMENT_CHOICE](state, payment_choice: string) {
    state.payment_choice = payment_choice;
  },
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {},
});
