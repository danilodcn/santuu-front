import { Vue, Watch } from "vue-property-decorator";
import { IDialog, MutationTypes } from "@/store";
import { Mutation } from "vuex-class";

export function formatPrice(price: number): string {
  return Number(price).toFixed(2);
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleString();
}

export function toDDMMYYYY(grossDate: string | undefined): string {
  if (!grossDate) {
    return "";
  }

  const date = new Date(grossDate);

  const day = Number(date.getDate().toString().padStart(2, "0")) + 1;
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function toYYYYMMDD(date: string): string {
  const [month, day, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function formatDateDetail(grossDate: string) {
  const date = new Date(grossDate);

  const minute = date.getMinutes().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${day}/${month}/${year} às ${hour}:${minute}`;

  return formatted;
}

const imagesIdentifier = [
  "invoice",
  "entireBike",
  "bicycleFrame",
  "handlebars",
  "crankset",
  "saddle",
  "frontWheel",
  "rearwheel",
  "derailleurs",
  "serialNumber",
  "ladoDireitoBike",
  "ladoEsquerdoBike",
];

const imagePriority = {
  ladoDireitoBike: 0,
  ladoEsquerdoBike: 1,
  entireBike: 2,
  bicycleFrame: 3,
  frontWheel: 4,
  rearwheel: 5,
  saddle: 6,
  handlebars: 7,
  crankset: 8,
  derailleurs: 9,
  serialNumber: 10,
  invoice: 11,
};

export function orderImage(images: any) {
  return images.sort((a: any, b: any) => {
    return (
      imagePriority[
        imagesIdentifier[b.identifier] as keyof typeof imagePriority
      ] -
      imagePriority[
        imagesIdentifier[a.identifier] as keyof typeof imagePriority
      ]
    );
  });
}

type CallFunctionDialog = (payload: IDialog) => void;
type TermsParams = {
  message: string;
  messageOk: string;
  messageCancel: string;
  agreeFunction?: () => any;
  disagreeFunction?: () => any;
};
export class VuePlus extends Vue {
  @Mutation(MutationTypes.TOGGLE_DIALOG) changeMainDialog!: CallFunctionDialog;

  agreeFunction = () => {
    return;
  };
  disagreeFunction = () => {
    return;
  };

  requestAcceptTerms(params: TermsParams) {
    this.changeMainDialog({
      msg: params.message,
      title: "Termos e Condições",
      persistent: true,
      active: true,
      bntClose: false,
      btnOkCancel: true,
      msgOk: params.messageOk,
      msgCancel: params.messageCancel,
      ident: false,
      termsAndConditions: true,
    });
    if (params.agreeFunction != undefined) {
      this.agreeFunction = params.agreeFunction;
    }
    if (params.disagreeFunction != undefined) {
      this.disagreeFunction = params.disagreeFunction;
    }
  }

  @Watch("$store.state.dialog.isResponseOk")
  onResponseChange(val: boolean) {
    if (val) {
      this.agreeFunction();
    } else {
      const dialog = this.$store.state.dialog;
      dialog.isResponseOk = undefined;
      this.disagreeFunction();
    }
  }
}

export function isValidCPF(cpf: string) {
  if (cpf.length != 14) return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    cpf.length !== 11 ||
    !Array.from(cpf).filter((e) => e !== cpf[0]).length
  ) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);

  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);

  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;

  return true;
}

const todayDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);

export function datePast(value: string) {
  const date = new Date(value);
  date.setDate(date.getDate() + 1);
  console.log(date);
  console.log(todayDate);
  return date < todayDate;
}
