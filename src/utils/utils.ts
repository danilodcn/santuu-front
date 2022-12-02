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

  const day = (date.getDate() + 1).toString().padStart(2, "0");
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

export const imagesConfig = [
  {
    name: "invoice",
    showName: "Nota fiscal",
    srcImageName: "invoice",
    identifier: 0,
    showPriority: 11,
  },
  // {
  //   name: "entireBike",
  //   typeName: "Bike Inteira",
  //   srcImageName: "entire-bike",
  //   identifier: 13,
  //   showPriority: 2,
  // },
  {
    name: "bicycleFrame",
    typeName: "Quadro",
    srcImageName: "bike-frame",
    identifier: 2,
    showPriority: 3,
  },
  {
    name: "handlebars",
    typeName: "Guidão",
    srcImageName: "handlebar",
    identifier: 3,
    showPriority: 7,
  },
  {
    name: "crankset",
    typeName: "Pedivela",
    srcImageName: "crank",
    identifier: 4,
    showPriority: 8,
  },
  {
    name: "saddle",
    typeName: "Selim",
    srcImageName: "saddle",
    identifier: 5,
    showPriority: 6,
  },
  {
    name: "frontWheel",
    typeName: "Roda Diantera",
    srcImageName: "wheel",
    identifier: 6,
    showPriority: 4,
  },
  {
    name: "rearwheel",
    typeName: "Roda Traseira",
    srcImageName: "wheel",
    identifier: 7,
    showPriority: 5,
  },
  {
    name: "derailleurs",
    typeName: "Câmbio",
    srcImageName: "crankset",
    identifier: 8,
    showPriority: 9,
  },
  {
    name: "serialNumber",
    showName: "Nº de Série - No quadro da bike",
    typeName: "Número de Série",
    srcImageName: "serial-number",
    identifier: 9,
    showPriority: 10,
  },
  {
    name: "ladoDireitoBike",
    typeName: "Lado direito da Bike",
    srcImageName: "bike",
    identifier: 10,
    showPriority: 0,
  },
  {
    name: "ladoEsquerdoBike",
    typeName: "Lado esquerdo da Bike",
    srcImageName: "bike-left",
    identifier: 11,
    showPriority: 1,
  },
];

export function orderImage(images: any) {
  return images.sort((a: any, b: any) => {
    return (
      (imagesConfig.find((element) => element.identifier == a.identifier)
        ?.showPriority || 99) -
      (imagesConfig.find((element) => element.identifier == b.identifier)
        ?.showPriority || 0)
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
  return date < todayDate;
}

export function validateForm(
  form: Vue | Element | (Vue | Element)[] | undefined
) {
  return (form as Vue & { validate: () => boolean }).validate();
}

export function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validateDate(date: string) {
  const dateParts = date.split("/");
  const dateObject = new Date(
    +dateParts[2],
    Number(dateParts[1]) - 1,
    +dateParts[0]
  );
  const diff =
    (new Date().getTime() - dateObject.getTime()) / (1000 * 3600 * 24 * 365);
  return diff > 10 && diff < 110;
}

export function leftPad(
  value: number,
  totalWidth: number,
  paddingChar: string
) {
  const length = totalWidth - value.toString().length + 1;
  return Array(length).join(paddingChar || "0") + value;
}
