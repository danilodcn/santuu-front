import { APIAuthBase } from "../auth";
import { AuthProvider } from "../auth.provider";

class GetRandomSubscriptionService extends APIAuthBase {
  async execute({
    eventID,
    number,
    generateRaffle,
  }: Input): Promise<
    Output[] | { axiosError: any; error: boolean; message: any }
  > {
    const url = `/api/bike-event/random-user-in-event/?event_id=${eventID}&number=${number}`;
    const method = generateRaffle ? "POST" : "GET";
    const response: any[] = await this.request({ url, method });
    if (Array.isArray(response)) {
      return response.map((item) => {
        let winners: Winner[];

        if (!item.winners) {
          winners = [];
        } else {
          winners = item?.winners?.map((winner: any) => {
            return {
              ...winner,
              subscriptionNumber: winner.subscription_number,
            };
          });
        }
        return {
          ...item,
          winners,
        };
      });
    } else {
      return response;
    }
  }
}

const authProvider = new AuthProvider();
const getRandomSubscriptionService = new GetRandomSubscriptionService(
  authProvider
);

export { getRandomSubscriptionService, GetRandomSubscriptionService };

type Input = {
  eventID: number;
  number: number;
  generateRaffle?: boolean;
};

type Winner = {
  id: number;
  order: number;
  subscriptionNumber: number;
};

type Output = {
  id: number;
  winners: Winner[];
  round: number;
};
