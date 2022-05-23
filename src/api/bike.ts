import { APIBase } from "./index";
import { INextStepDTO } from "@/types/simulation";

export class BikeService extends APIBase {
  async getBrands(program = "") {
    const url = `/dashboard/proposal/get_brands/?program=${program}`;
    return await this.request({ url, method: "GET" });
  }

  async getCategories(brand_id = "") {
    const url = `/dashboard/proposal/get_categories/?brand=${brand_id}`;
    return await this.request({ url, method: "GET" });
  }

  async getModels(brand_id: string, category_id: string) {
    const url = `/dashboard/proposal/get_models/?brand_id=${brand_id}&category_id=${category_id}`;
    return await this.request({ url, method: "GET" });
  }

  async getStores(brand_id: string, bike_situation: number, program: string) {
    const url = `/dashboard/proposal/get_stores/?brand_id=${brand_id}&bike_situation=${bike_situation}&program=${program}`;
    return await this.request({ url, method: "GET" });
  }

  async getNextStep(data: INextStepDTO | typeof Object) {
    const url = "/api/insurance/proposal/get-next-step/";
    return await this.request({ url, method: "POST", data });
  }

  async generateBid(proposalId: number, voucher = "", pqp = false) {
    const url = `/dashboard/proposal/generate_bids/?proposalId=${proposalId}&voucher=${voucher}&pqp=${pqp}&bid_proposal=true`;
    return await this.request({ url, method: "GET" });
  }
}
