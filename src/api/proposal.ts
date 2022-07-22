import { APIAuthBase } from "./auth";

interface IUpdate {
  proposal_id: number;
  enabled: boolean;
}

class ProposalService extends APIAuthBase {
  async getSimpleProposal(proposal_id: number | string) {
    const url = `dashboard/proposal/get-proposal/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }

  async getProposal(proposal_id: number | string) {
    const url = `dashboard/proposal/proposal/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
  async getProposalImages(proposal_id: number | string) {
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

const proposalService = new ProposalService();

export { ProposalService, proposalService };
