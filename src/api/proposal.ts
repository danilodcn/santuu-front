import { APIBase } from "./index";

interface IUpdate {
  proposal_id: number;
  enabled: boolean;
}

export class ProposalService extends APIBase {
  async getProposal(proposal_id: number) {
    const url = `dashboard/proposal/get_proposal/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
  async updateDeductibleEnabled(update: IUpdate) {
    console.log(update);
    const url = `dashboard/proposal/update_deductible_enabled/`;
    const data = {
      update: update,
    };
    const dataJson = JSON.stringify(data);
    return await this.request({ url, method: "PUT", data: dataJson });
  }
}
