import { APIAuthBase } from "../auth";
import { AuthProvider } from "../auth.provider";

class GetRandomSubscriptionService extends APIAuthBase {
  async execute({ eventID, number }: Input) {
    const url = `/api/bike-event/random-user-in-event/?event_id=${eventID}&number=${number}`;
    this.request({ url, method: "GET" });
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
