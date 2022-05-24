import { APIBase } from "./index";

export class QRCodeService extends APIBase {
  async getQRCode(qrCodeKey: string | (string | null)[] = "") {
    const url = `dashboard/proposal/get_qr_code/${qrCodeKey}/`;
    return await this.request({ url, method: "GET" });
  }
}
