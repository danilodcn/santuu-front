import { AxiosError } from "axios";
import { APIAuthBase } from "../auth";
import { AuthProvider } from "../auth.provider";

class GetRandomSubscriptionService extends APIAuthBase {
  async execute({
    eventID,
    number,
  }: Input): Promise<
    Output[] | { axiosError: any; error: boolean; message: any }
  > {
    const url = `/api/bike-event/random-user-in-event/?event_id=${eventID}&number=${number}`;
    const response: any[] = await this.request({ url, method: "GET" });
    if (Array.isArray(response)) {
      return response.map((item) => {
        return {
          ...item,
          subscriptionNumber: item.subscription_number,
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
};

type Output = {
  id: number;
  subscriptionNumber: number;
  order: number;
};
