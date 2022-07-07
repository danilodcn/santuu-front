import { eventService } from "@/api/bikeEvents";
import { getRandomSubscriptionService } from "@/api/raffle/getRandomSubscription";
import { presenceConfirmationService } from "@/api/raffle/presenceConfirmation";

enum RaffleTypes {
  BIKE_EVENT = "bike-event",
  NUMBER = "number",
}

type OutputClick = {
  error?: boolean;
  message?: string;
};

type ResponseOutput = {
  order: number;
  name: string;
  item: string;
};

type OutputExecute = {
  error?: boolean;
  message?: string;
  responses?: ResponseOutput[];
};

interface IAdditionalComponent {
  component: string;
  text?: string;
  props: object[];
  containerProps: object[];
  model?: any;
  getProps(props?: any[]): Promise<void>;
  onClick(action: IRaffleTypeAction): Promise<OutputClick>;
}

interface IRaffleType {
  type: string;
  name: string;
}

interface IRaffleTypeAction {
  type: IRaffleType;
  resultText: string;
  verboseResultText: string;
  memberName: string;
  verboseMemberName: string;
  additionalComponents?: IAdditionalComponent[];
  execute(input: any): Promise<OutputExecute>;
}

const RAFFLE_ACTIONS: IRaffleTypeAction[] = [
  {
    type: { type: RaffleTypes.BIKE_EVENT, name: "Evento" },
    resultText: "O participante sorteado foi:",
    verboseResultText: "Os participantes sorteados foram:",
    memberName: "participante",
    verboseMemberName: "participantes",

    async execute(input: any) {
      const id: number = this.additionalComponents
        ?.map((item) => item.model)
        .find((item) => item);

      if (!id) return { error: true, message: "Selecione um evento!" };

      if (!input.number)
        return {
          error: true,
          message: `O número de ${this.verboseMemberName} é obrigatório!`,
        };
      else {
        const res = await getRandomSubscriptionService.execute({
          eventID: id,
          number: input.number,
        });

        if (!Array.isArray(res) && res.error) {
          console.log(res);
          return {
            error: true,
            message: res.message || res.axiosError?.response?.data?.message,
          };
        } else if (Array.isArray(res)) {
          console.log(res);
          let out: ResponseOutput, name: string;
          const responses: ResponseOutput[] = res
            .filter((item) => item.subscriptionNumber)
            .map((item) => {
              name = item.subscriptionNumber.toString();
              out = {
                name,
                item: name,
                order: item.order,
              };
              return out;
            });
          return { error: false, responses };
        }
        return {
          error: false,
        };
      }
    },

    additionalComponents: [
      {
        component: "v-autocomplete",
        props: [{ filled: true }, { outlined: true }, { label: "Evento" }],
        containerProps: [{ cols: "12" }, { md: "5" }],
        async getProps() {
          const events = await eventService.getEvent({ id: "", type: "" });

          const props = [
            {
              items: events,
            },
            { itemText: "name" },
            { itemValue: "id" },
          ];
          this.props = [...this.props, ...props];
        },
        async onClick() {
          return {};
        },
      },
      {
        component: "v-btn",
        text: "Liberar",
        props: [{ filled: true }, { outlined: true }, { color: "primary" }],
        containerProps: [
          { cols: "12" },
          { align: "center" },
          { justify: "center" },
          { class: "my-2 py-0" },
        ],
        async getProps() {
          return;
        },

        async onClick(action: IRaffleTypeAction) {
          const id: number = action.additionalComponents
            ?.map((item) => item.model)
            .find((item) => item);

          if (id) {
            const response = await presenceConfirmationService.event({
              eventID: id,
            });
            if (!response.hasActivePresenceConfirmation) {
              return { error: true, message: "Erro ao executar ação!" };
            } else {
              this.text = "Liberado";
              return { error: false, message: "Tudo certo!" };
            }
          } else {
            return { error: true, message: "Selecione um evento!" };
          }
        },
      },
    ],
  },
  {
    type: { type: RaffleTypes.NUMBER, name: "Numero" },
    resultText: "O número sorteado foi:",
    verboseResultText: "Os números sorteados foram:",
    memberName: "número",
    verboseMemberName: "números",

    async execute(input: any) {
      input.min = Number(input.min);
      input.max = Number(input.max);
      input.number = Number(input.number);

      console.log(input);
      if (!input.number)
        return {
          error: true,
          message: `O número de ${this.verboseMemberName} é obrigatório!`,
        };

      if (input.min >= input.max)
        return {
          error: true,
          message: "Insira os valores de entrada corretamente",
        };

      const x = [];
      for (let i = input.min; i < input.max + 1; i++) {
        x.push(i);
      }
      console.log(x, "antes");

      x.sort(function (a, b) {
        return Math.round(Math.random()) - 0.5;
      });
      let out, name;
      const responses = x.slice(0, input.number).map((item, i) => {
        name = item.toString();
        out = {
          name,
          item: name,
          order: i,
        };
        return out;
      });
      console.log(responses);

      return {
        error: false,
        responses,
      };
    },
  },
];

class RaffleHelper {
  raffleTypes: IRaffleType[];
  constructor() {
    this.raffleTypes = RAFFLE_ACTIONS.map((item) => item.type);
  }

  async getAction(type: string) {
    const action = RAFFLE_ACTIONS.find((item) => item.type.type === type);
    if (!action) throw new Error(`Action type ${type} not fount on array`);

    const components = action.additionalComponents || [];
    for (const component of components) {
      await component.getProps();
    }
    return action;
  }

  get imgProps() {
    const height = 75;
    return {
      "max-width": height,
      "max-height": height,
      "aspect-ratio": 1,
      height: height,
    };
  }
}

const raffleHelper = new RaffleHelper();

export {
  raffleHelper,
  RaffleHelper,
  IRaffleType,
  IRaffleTypeAction,
  IAdditionalComponent,
};
