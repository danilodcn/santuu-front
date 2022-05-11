import { APIBase } from "./index";

export class BikeService extends APIBase {
  async getBrands(program = "") {
    const url = `/dashboard/proposal/get_brands/?program=${program}`;
    return await this.request({ url, method: "GET" });
  }
}
