import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

class ProposalImagesService extends APIAuthBase {
  async getMissingImages(proposal_id: number) {
    const url = `/api/insurance-v2/missing_images/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
  async proposalImages(form: HTMLFormElement) {
    const url = `/api/insurance-v2/proposal_images/`;
    return await this.request({
      url,
      method: "POST",
      data: new FormData(form),
      headers: {
        ...this.config.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const authProvider = new AuthProvider();
const proposalImageService = new ProposalImagesService(authProvider);

export { ProposalImagesService, proposalImageService };
