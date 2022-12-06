import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

class SOSService extends APIAuthBase {
  async getOpenOrder() {
    const url = `api/sos/sos_claim/get_open_order/`;
    return await this.request({ url, method: "GET" });
  }
  async getOrder(id: number) {
    const url = `api/sos/sos_claim/get_order?id=${id}`;
    return await this.request({ url, method: "GET" });
  }
  async getListCall() {
    const url = "api/sos/sos_claim/claim_list";
    return await this.request({ url, method: "GET" });
  }
  async getMessages(order_id: number, last_message_time: string) {
    const url = `api/sos/message/get_messages/?order_id=${order_id}&last_message_time=${last_message_time}`;
    return await this.request({ url, method: "GET" });
  }
}

const authProvider = new AuthProvider();
const sosService = new SOSService(authProvider);

export { SOSService, sosService };
