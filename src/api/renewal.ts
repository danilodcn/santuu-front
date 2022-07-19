import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

class RenewalService extends APIAuthBase {
  async renew(proposal_id: number) {
    const url = `api/insurance/create-renew/${proposal_id}/`;
    return await this.request({ url, method: "POST" });
  }
}

const authProvider = new AuthProvider();
const renewalService = new RenewalService(authProvider);

export { RenewalService, renewalService };
