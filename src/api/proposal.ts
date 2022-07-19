import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

interface IUpdate {
  proposal_id: number;
  enabled: boolean;
}

class ProposalService extends APIAuthBase {
  async getProposal(proposal_id: number) {
    const url = `dashboard/proposal/proposal/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
  async getProposalImages(proposal_id: number) {
    const url = `api/insurance-v2/proposal-images/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
  async updateDeductibleEnabled(update: IUpdate) {
    const url = `dashboard/proposal/update_deductible_enabled/`;
    const data = {
      update: update,
    };
    const dataJson = JSON.stringify(data);
    return await this.request({ url, method: "PUT", data: dataJson });
  }
}

const authProvider = new AuthProvider();
const proposalService = new ProposalService(authProvider);

export { ProposalService, proposalService };
