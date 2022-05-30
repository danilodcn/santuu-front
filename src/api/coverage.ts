import { APIBase } from "./index";

interface IUpdates {
  coverage_id: number;
  enabled: boolean;
}

export class CoverageService extends APIBase {
  async updateCoverage(updates: IUpdates[]) {
    const url = `dashboard/proposal/update_coverages/`;
    const data = {
      updates: updates,
    };
    const dataJson = JSON.stringify(data);
    return await this.request({ url, method: "PUT", data: dataJson });
  }
}
