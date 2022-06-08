import { IBrand, ICategory, IModel, IStore } from "./bike";

export interface IForm {
  brand: string;
  hasNote?: boolean;
  acquisitionDate?: string;
  manufactureYear: string;
  isOrigin?: boolean;
  isElectrical?: boolean;
  situation?: number;
  category: string;
  model?: IModel;
  modelDesc?: string;
  modelId?: string;
  price?: number;
  originStore: string;
  voucher: string;
  recaptchaToken?: string;
  loading?: boolean;
}

export interface IFormItems {
  brand: IBrand[];
  category: ICategory[];
  model: IModel[];
  originStore: IStore[];
}

export interface IAssociateBikeDTO {
  bike_price: number;
  bike_use?: number | null;
  brand_id: number | string;
  category_id: number | string;
  date_of_acquisition?: Date | null;
  has_tax_invoice: boolean;
  model_desc?: string | null;
  model_id?: number | string;
  rental_bike?: string | null;
  situation: number;
}

export interface IProposalDTO {
  id?: number | string;
  status?: number | string;
  origin_store_id?: number | string;
  associate_step?: number | string;
  partner_step?: number | string;
  associate_bikes?: Array<IAssociateBikeDTO>;
  chosen_bid_id?: number | string;
  proposal_coverages?: [];
  proposal_images?: [];
}

export interface INextStepDTO {
  action: number;
  associate?: typeof Object;
  proposal: IProposalDTO;
  insurance_premium?: number | string;
  recaptchaToken?: string;
}
