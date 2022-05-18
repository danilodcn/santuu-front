import { IBrand, ICategory, IModel, IStore } from "./bike";

export interface IForm {
  brand: string;
  situation?: number;
  category: string;
  model?: IModel;
  modelDesc?: string;
  modelId?: string;
  price?: number;
  originStore: string;
  voucher: string;
  recaptchaToken?: string;
}

export interface IFormItems {
  brand: IBrand[];
  category: ICategory[];
  model: IModel[];
  originStore: IStore[];
}

interface IAssociateBikeDTO {
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

interface IProposalDTO {
  origin_store_id: number | string;
  associate_bikes: Array<IAssociateBikeDTO>;
}

export interface INextStepDTO {
  action: number;
  associate?: typeof Object;
  proposal: IProposalDTO;
  recaptchaToken?: string;
}
