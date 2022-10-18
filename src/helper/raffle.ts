import { getRandomSubscriptionService } from "@/api/raffle/getRandomSubscription";

type Winner = {
  id: number;
  order: number;
  subscriptionNumber: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  cpf: string;
};

type ResponseOutput = {
  round: number;
  name: string;
  item: string;
  winners: Winner[];
};

class RaffleHelper {
  get imgProps() {
    const height = 75;
    return {
      "max-width": height,
      "max-height": height,
      "aspect-ratio": 1,
      height: height,
    };
  }

  async getRaffleSubscriptions(input: InputDTO) {
    const res = await getRandomSubscriptionService.execute(input);

    if (!Array.isArray(res) && res.error) {
      return {
        error: true,
        message: res.message || res.axiosError?.response?.data?.message,
      };
    } else if (Array.isArray(res)) {
      let out: ResponseOutput, name: string;
      const responses: ResponseOutput[] = res
        .filter((item) => item.winners)
        .map((item) => {
          out = {
            ...item,
            name,
            item: name,
            round: item.round,
          };
          return out;
        });
      return { error: false, responses };
    }
  }
}

type InputDTO = {
  eventID: number;
  number: number;
  generateRaffle: boolean;
};

const raffleHelper = new RaffleHelper();

export { raffleHelper, RaffleHelper };
