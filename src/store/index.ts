import Vue from "vue";
import Vuex, { GetterTree, MutationTree, ActionTree } from "vuex";
import { ICoverage } from "@/types/proposal";

Vue.use(Vuex);

export enum MutationTypes {
  CHANGE_COVERAGES = "CHANGE_COVERAGES",
  CHANGE_ENABLED = "CHANGE_ENABLED",
  CHANGE_INSURANCE_PREMIUM = "CHANGE_INSURANCE_PREMIUM",
  TOGGLE_DIALOG = "TOGGLE_DIALOG",
  TOGGLE_LOADING = "TOGGLE_LOADING",
}

export enum GetterTypes {
  INSURANCE_PREMIUM = "INSURANCE_PREMIUM",
}

export enum ActionsTypes {
  CHANGE_ENABLED = "CHANGE_ENABLED",
}

export interface IDialog {
  msg: string;
  active: boolean;
  title: string;
  bntClose: boolean;
  persistent: boolean;
  btnOkCancel?: boolean;
  msgOk?: string;
  msgCancel?: string;
  isResponseOk?: boolean;
  ident?: boolean;
  termsAndConditions?: boolean;
}

const state = {
  dialog: {
    msg: "",
    active: false,
    title: "",
    bntClose: false,
    persistent: false,
    btnOkCancel: false,
    msgOk: "",
    msgCancel: "",
    isResponseOk: undefined,
    ident: true,
    termsAndConditions: false,
  } as IDialog,
  proposal_coverages: [] as ICoverage[],
  proposal: {
    insurance_proposal: 0,
    installments_message: "",
  },
  loading: false,
};

export type RootState = typeof state;

export interface ISwitchToEnable {
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

  [MutationTypes.CHANGE_INSURANCE_PREMIUM](state, payload) {
    state.proposal.insurance_proposal = payload;
  },

  [MutationTypes.CHANGE_ENABLED](state, payload: ISwitchToEnable) {
    state.proposal_coverages[payload.index].enabled = payload.enabled;
  },

  [MutationTypes.TOGGLE_LOADING](state, payload: boolean) {
    state.loading = !state.loading;
  },
};

const getters: GetterTree<RootState, RootState> = {
  [GetterTypes.INSURANCE_PREMIUM](state) {
    let amount = 0;
    const coverages = state.proposal_coverages;

    coverages.forEach((c) => {
      if (c.enabled) {
        amount += c.amount;
      }
    });
    return amount;
    // return proposal.insurance_proposal;
  },
};

const actions: ActionTree<RootState, RootState> = {
  [ActionsTypes.CHANGE_ENABLED](props, payload: ISwitchToEnable) {
    props.commit(MutationTypes.CHANGE_ENABLED, payload);
    let amount = 0;
    const coverages = props.state.proposal_coverages;

    coverages.forEach((c) => {
      if (c.enabled) {
        amount += c.amount;
      }
    });
    props.commit(MutationTypes.CHANGE_INSURANCE_PREMIUM, amount);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
