import { APIBase } from "./index";

export class BikeService extends APIBase {
  async getBrands(program = "") {
    const url = `/dashboard/proposal/get_brands/?program=${program}`;
    return await this.request({ url, method: "GET" });
  }

  async getCategories(brand_id = "") {
    const url = `/dashboard/proposal/get_categorys/?brand=${brand_id}`;
    return await this.request({ url, method: "GET" });
  }

  async getModels(brand_id: string, category_id: string) {
    const url = `/dashboard/proposal/get_models/?brand_id=${brand_id}&category_id=${category_id}`;
    return await this.request({ url, method: "GET" });
  }
}
