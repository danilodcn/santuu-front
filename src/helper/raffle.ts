import { IEvent } from "@/types/events";
import { eventService } from "@/api/bikeEvents";

enum RaffleTypes {
  BIKE_EVENT = "bike-event",
  NUMBER = "number",
}

interface IAdditionalComponent {
  component: string;
  text?: string;
  props: any[];
  model?: any;
  getProps(props?: any[]): Promise<void>;
  execute?(data: any): void;
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
}

const RAFFLE_ACTIONS: IRaffleTypeAction[] = [
  {
    type: { type: RaffleTypes.BIKE_EVENT, name: "Evento" },
    resultText: "O participante sorteado foi:",
    verboseResultText: "Os participantes sorteados foram:",
    memberName: "participante",
    verboseMemberName: "participantes",
    additionalComponents: [
      {
        component: "v-autocomplete",
        props: [{ filled: true }, { outlined: true }, { label: "Evento" }],
        async getProps() {
          const events = await eventService.getEvent({ id: "", type: "" });

          const props = [
            {
              items: events,
            },
            { itemText: "name" },
          ];
          this.props = this.props.concat(props);
        },
      },
      {
        component: "v-btn",
        text: "Liberar",
        props: [{ filled: true }, { outlined: true }, { color: "primary" }],
        async getProps() {
          return;
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
  },
];

class RaffleHelper {
  raffleTypes: IRaffleType[];
  constructor() {
    this.raffleTypes = RAFFLE_ACTIONS.map((item) => item.type);
  }

  getAction(type: string) {
    const action = RAFFLE_ACTIONS.find((item) => item.type.type === type);
    if (!action) throw new Error(`Action type ${type} not fount on array`);
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

export { raffleHelper, RaffleHelper, IRaffleType, IRaffleTypeAction };
