import { APIAuthBase } from "./auth";
import { AuthProvider } from "./auth.provider";

class DownloadEventCertificateService extends APIAuthBase {
  async execute({ eventID }: Input) {
    const url = `/api/bike-event/certificate-events/download/event-id=${eventID}`;
    await this.request({
      url,
      method: "GET",
      responseType: "blob",
    })
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate_${eventID}.pdf`;
        a.click();
        a.remove();
        setTimeout(() => window.URL.revokeObjectURL(url), 500);
      });
  }
}

type Input = { eventID: number };

const authProvider = new AuthProvider();
const downloadEventCertificateService = new DownloadEventCertificateService(
  authProvider
);

export { downloadEventCertificateService, DownloadEventCertificateService };
