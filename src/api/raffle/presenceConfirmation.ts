import { APIAuthBase } from "../auth";
import { AuthProvider } from "../auth.provider";

class PresenceConfirmationService extends APIAuthBase {
  async event({ eventID }: Input): Promise<Output> {
    const url = `/api/bike-event/event/presence-confirmation/${eventID}`;
    const response = await this.request({ url, method: "GET" });

    const output: Output = {
      hasActivePresenceConfirmation: response.has_active_presence_confirmation,
    };
    return output;
  }

  async subscription({ eventID }: Input): Promise<any> {
    const url = `/api/bike-event/subscription/presence-confirmation/${eventID}`;
    return await this.request({ url, method: "POST" });
  }
}

const authProvider = new AuthProvider();
const presenceConfirmationService = new PresenceConfirmationService(
  authProvider
);

export { presenceConfirmationService, PresenceConfirmationService };

type Input = {
  eventID: number;
};

type Output = {
  hasActivePresenceConfirmation: boolean;
};
