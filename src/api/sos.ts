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
    const url = `api/sos/sos_claim/get_order?id=${id}&force_no_cache=${Math.random()}`;
    return await this.request({ url, method: "GET" });
  }
  async getClaimList() {
    const url = "api/sos/sos_claim/claim_list";
    return await this.request({ url, method: "GET" });
  }

  async sendMessages(message: string, order_id: number) {
    const url = `api/sos/message/`;
    return await this.request({
      url,
      method: "POST",
      data: {
        message: message,
        order_id: order_id,
      },
    });
  }
  async getMessages(order_id: number, last_message_time: string) {
    const url = `api/sos/message/get_messages/?order_id=${order_id}&last_message_time=${last_message_time}`;
    return await this.request({ url, method: "GET" });
  }
  async checkMechanic() {
    const url = `api/sos/check_mechanic/`;
    return await this.request({ url, method: "GET" });
  }

  async hasNewMessages(order_id: number) {
    const url = `api/sos/message/has_new_messages/?order_id=${order_id}&force_no_cache=${Math.random()}`;
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
    return await this.request({
      url,
      method: "PUT",
      data: data,
      headers: {
        ...this.config.headers,
      },
    });
  }
  async sendMechanicReport(dataReport: any) {
    const url = `/api/sos/sos_claim/send_mechanic_report/`;
    const data = {
      ...dataReport,
    };
    return await this.request({
      url,
      method: "PUT",
      data: data,
      headers: {
        ...this.config.headers,
      },
    });
  }
  async sendRating(dataRating: any) {
    const url = `/api/sos/sos_claim/rating_order/`;
    const data = {
      ...dataRating,
    };
    return await this.request({
      url,
      method: "PUT",
      data: data,
      headers: {
        ...this.config.headers,
      },
    });
  }
  async getLanes() {
    const url = `api/sos/sos_lane/`;
    return await this.request({ url, method: "GET" });
  }
  async getUserLastOrder() {
    const url = `api/sos/sos_claim/user_last_order/`;
    return await this.request({ url, method: "GET" });
  }
  async updateMechanicPosition(dataPosition: any) {
    const url = `/api/sos/mechanic_coordinates/`;
    const data = {
      ...dataPosition,
    };
    return await this.request({
      url,
      method: "PUT",
      data: data,
      headers: {
        ...this.config.headers,
      },
    });
  }
  async getMechanicPosition(id: number) {
    const url = `/api/sos/mechanic_coordinates/${id}`;
    return await this.request({ url, method: "GET" });
  }
  async sendSosMechanicPosition(dataPosition: any) {
    const url = `/api/sos/initial_mechanic_coords/`;
    const data = {
      ...dataPosition,
    };
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
