import { IDialog, MutationTypes } from "@/store";
import { Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";

type CallFunctionLoading = (loading: boolean) => void;
type CallFunctionDialog = (payload: IDialog) => void;

class BaseComponent extends Vue {
  @Mutation(MutationTypes.TOGGLE_LOADING) changeLoading!: CallFunctionLoading;
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainLDialog!: CallFunctionDialog;
}

export { BaseComponent };
