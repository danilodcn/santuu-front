import { APIBase } from "./index";

interface IUpdate {
  proposal_id: number;
  enabled: boolean;
}

export class ProposalService extends APIBase {
  async getProposal(proposal_id: number) {
    const url = `dashboard/proposal/proposal/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }

  async getSimpleProposal(proposal_id: number | string) {
    const url = `dashboard/proposal/get-proposal/${proposal_id}/`;
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

  async getDiscountRenew(proposal_id: number | string) {
    const url = `dashboard/proposal/get-discount/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
  async getDiscountProgram(proposal_id: number | string) {
    const url = `dashboard/proposal/get-discount-program/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
}
