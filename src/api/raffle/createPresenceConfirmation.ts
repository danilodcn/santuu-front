import { APIAuthBase } from "../auth";
import { AuthProvider } from "../auth.provider";

class CreatePresenceConfirmation extends APIAuthBase {
  async execute({ eventID }: Input): Promise<Output> {
    const url = `/api/bike-event/presence-confirmation-create/?event_id=${eventID}`;
    const response = await this.request({ url, method: "GET" });

    const output: Output = {
      hasActivePresenceConfirmation: response.has_active_presence_confirmation,
    };
    return output;
  }
}

const authProvider = new AuthProvider();
const createPresenceConfirmation = new CreatePresenceConfirmation(authProvider);

export { createPresenceConfirmation, CreatePresenceConfirmation };

type Input = {
  eventID: number;
};

type Output = {
  hasActivePresenceConfirmation: boolean;
};
