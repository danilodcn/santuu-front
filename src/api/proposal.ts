import { APIBase } from "./index";

export class ProposalService extends APIBase {
  async getProposal(proposal_id: number) {
    const url = `/dashboard/get_proposal/get_brands/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
}
