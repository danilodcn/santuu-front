import { APIBase } from "./index";
import { APIAuthBase } from "@/api/auth";

interface IUpdate {
  coverage_id: number;
  enabled: boolean;
}

export class CoverageService extends APIBase {
  async updateCoverage(updates: IUpdate[]) {
    const url = `dashboard/proposal/update_coverages/`;
    const data = {
      updates: updates,
    };
    const dataJson = JSON.stringify(data);
    return await this.request({ url, method: "PUT", data: dataJson });
  }
}

class CoverageAuthService extends APIAuthBase {
  async updateCoverage(updates: IUpdate[]) {
    const url = `dashboard/proposal/update_coverages/`;
    const data = {
      updates: updates,
    };
    const dataJson = JSON.stringify(data);
    return await this.request({ url, method: "PUT", data: dataJson });
  }
}

const coverageAuth = new CoverageAuthService();

export { coverageAuth, CoverageAuthService };
