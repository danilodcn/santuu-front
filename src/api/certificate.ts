import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

class CertificateService extends APIAuthBase {
  async getCertificate() {
    const url = `api/insurance/get_certificates/`;
    return await this.request({ url, method: "GET" });
  }
}
const authProvider = new AuthProvider();
const certificateService = new CertificateService(authProvider);

export { CertificateService, certificateService };
