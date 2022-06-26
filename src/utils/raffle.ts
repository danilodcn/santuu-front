import { IEvent } from "@/types/events";
import { eventService } from "@/api/bikeEvents";

enum RaffleTypes {
  BIKE_EVENT = "bike-event",
  NUMBER = "number",
}

interface IAdicionalField {
  component: string;
  text?: string;
  getProps(props?: any[]): Promise<any[]>;
}

interface IRaffleType {
  type: string;
  name: string;
}

interface IRaffleTypeAction {
  type: IRaffleType;
  resultText: string;
  verboseResultText?: string;
  memberName: string;
  verboseMemberName?: string;
  adicionalField?: IAdicionalField;
  adicionalAction?: IAdicionalField;
}

const RAFFLE_ACTIONS: IRaffleTypeAction[] = [
  {
    type: { type: RaffleTypes.BIKE_EVENT, name: "Evento" },
    resultText: "O número sorteado foi:",
    verboseResultText: "Os números sorteados foram:",
    memberName: "participante",
    verboseMemberName: "participantes",
    adicionalField: {
      component: "v-autocomplete",
      getProps: async (props: any[]) => {
        const events = await eventService.getEvent({ id: "", type: "" });
        console.log("meus eventos", events);

        return [
          { filled: true },
          { outlined: true },
          { label: "Evento" },
          {
            items: events,
          },
          { itemText: "name" },
        ];
      },
    },
    adicionalAction: {
      component: "v-btn",
      text: "Liberar",
      getProps: async () => {
        return [{ filled: true }, { outlined: true }, { color: "primary" }];
      },
    },
  },
  {
    type: { type: RaffleTypes.NUMBER, name: "Numero" },
    resultText: "O participante sorteado foi:",
    verboseResultText: "Os participantes sorteados foram:",
    memberName: "participante",
    verboseMemberName: "participantes",
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
