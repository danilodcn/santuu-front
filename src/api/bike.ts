import { APIBase } from "./index";
import {
  IAssociateBikeDTO,
  INextStepDTO,
  IProposalDTO,
} from "@/types/simulation";
import { IVoucher } from "@/types/voucher";

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

  async getStores(
    brand_id: string,
    bike_situation: number,
    program: string,
    voucher: string
  ) {
    const url = `/dashboard/proposal/get_stores/?brand_id=${brand_id}&bike_situation=${bike_situation}&program=${program}&voucher=${
      voucher || ""
    }`;
    return await this.request({ url, method: "GET" });
  }

  async getNextStep(data: INextStepDTO | typeof Object) {
    const url = "/api/insurance/proposal/get-next-step/";
    return await this.request({ url, method: "POST", data });
  }

  async setAssociateBike(data: any) {
    const url = "/dashboard/proposal/associate_bike/";
    return await this.request({ url, method: "POST", data });
  }

  async generateBid(proposalId: number, voucher = "", pqp = false) {
    const __voucher = voucher ? `&voucher=${voucher}` : "";
    const url = `/dashboard/proposal/generate_bids/?proposalId=${proposalId}${__voucher}&pqp=${pqp}&bid_proposal=true`;
    return await this.request({ url, method: "GET" });
  }

  async getVoucherInfo(voucher: string): Promise<IVoucher> {
    const url = `/api/voucher/get-discount/?voucher=${voucher || ""}`;
    const response = await this.request({ url, method: "GET" });

    return {
      ...response,
      isValid: response.is_valid,
      discountPercentage: response.discount_percentage,
      initialDate: response.initial_date,
      expirationDate: response.expiration_date,
    };
  }
}
