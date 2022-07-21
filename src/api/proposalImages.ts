import { APIAuthBase } from "./auth";
import { AuthProvider } from "@/api/auth.provider";

class ProposalImagesService extends APIAuthBase {
  async getMissingImages(proposal_id: number) {
    const url = `/api/insurance-v2/missing_images/${proposal_id}/`;
    return await this.request({ url, method: "GET" });
  }
}

const authProvider = new AuthProvider();
const proposalImageService = new ProposalImagesService(authProvider);

export { ProposalImagesService, proposalImageService };
