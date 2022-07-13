import { IProgram } from "@/types/program";

export interface ICoverage {
  id: number;
  name: string;
  deductible_text: string;
  legal_text: string;
  amount: number;
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
  discount_percentage: string;
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
}
