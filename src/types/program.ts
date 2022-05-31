export interface IProgram {
  id: number;
  name: string;
  flexible_coverage_enabled: boolean;
  flexible_deductible_enabled: boolean;
  image_program: string;
  minimal_premium: number;
  iof_tax_rate: number;
}
