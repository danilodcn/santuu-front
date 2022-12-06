import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";
import { ISosCallForm } from "@/types/sos";

class SOSService extends APIAuthBase {
  async getOpenOrder() {
    const url = `api/sos/sos_claim/get_open_order/`;
    return await this.request({
      url,
      method: "GET",
    });
  }
  async getOrder(id: number) {
    const url = `api/sos/sos_claim/get_order?id=${id}`;
    return await this.request({ url, method: "GET" });
  }
  async getListCall() {
    const url = "api/sos/sos_claim/claim_list";
    return await this.request({ url, method: "GET" });
  }
  async getAddress(lat: number, lng: number, apiKey: string) {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    )
      .then((data) => data.json())
      .catch((err) => console.log(err));
  }
  async submitSosForm(form: ISosCallForm) {
    const url = `/api/sos/sos_claim/`;
    const data = {
      ...form,
    };
    console.log(data);
    return await this.request({
      url,
      method: "POST",
      data: data,
      headers: {
        ...this.config.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async updateStatus(dataStatus: any) {
    const url = `/api/sos/update_status/`;
    const data = {
      ...dataStatus,
    };
    console.log(data);
    return await this.request({
      url,
      method: "PUT",
      data: data,
      headers: {
        ...this.config.headers,
      },
    });
  }
}

const authProvider = new AuthProvider();
const sosService = new SOSService(authProvider);

export { SOSService, sosService };
