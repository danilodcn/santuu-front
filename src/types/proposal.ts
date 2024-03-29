import { IProgram } from "@/types/program";
import { IModel } from "@/types/bike";

export const PROPOSAL_OPTIONS = [
  "Endosso",
  "Renovação",
  "Seguro Novo",
  "Voucher",
];
export interface ICoverage {
  id: number;
  name: string;
  deductible_text: string;
  legal_text: string;
  net_premium: number;
  lmi: number;
  enabled: boolean;
  is_fixed: boolean;
  order: number;
}

export interface IAssociateBike {
  id: number;
  brand: string;
  category: string;
  model: string;
  price: string | number;
}

export interface IProposalBid {
  id: number;
  number_of_installments: number;
  amount: number;
  discount_amount: number;
  gross_amount: number;
  minimal_amount: number;
}

export interface IVoucher {
  id: number;
  discount_percentage: number;
}
export interface IInstallments {
  id: number;
  payment_date: string;
  amount: number;
  tax_value: number;
  week: number;
  sequence: number;
  bordereau: number;
}
export interface IProposal {
  id: number;
  created_at: string;
  proposal_coverages: ICoverage[];
  associate_bikes: IAssociateBike[];
  iof: number;
  gross_insurance_premium: number;
  program: IProgram;
  proposal_bids: IProposalBid[];
  insurance_premium_discount: number;
  insurance_premium: number;
  calculated_insurance_premium: number;
  deductible_enabled: boolean;
  voucher: IVoucher;
  number_of_installments: number;
  installment: IInstallments[];
  original_proposal: number;
  already_renewed: boolean;
  model: IModel;
  proposal_type: number;
}
export interface IProgramImage {
  id: number;
  image_type_name: string;
  image_type: number;
  is_seller_upload: boolean;
  is_associate_upload: boolean;
  is_new_bike: boolean;
  is_used_bike: boolean;
  program: number;
}
