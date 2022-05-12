import { APIBase } from "./index";

export class ProposalService extends APIBase {
  async getProposal(proposal_id: number) {
    const url = `dashboard/proposal/get_proposal/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
}
