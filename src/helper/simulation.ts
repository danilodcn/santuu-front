import { IForm, INextStepDTO, IProposalDTO } from "@/types/simulation";

export class SimulationHelper {
  handle(form: IForm): INextStepDTO {
    const data: INextStepDTO = {
      action: 0,
      recaptchaToken: form.recaptchaToken,
      proposal: {
        origin_store_id: form.originStore,
        associate_bikes: [
          {
            bike_price: form.price || 0,
            brand_id: form.brand,
            category_id: form.category,
            date_of_acquisition: null,
            bike_use: null,
            rental_bike: null,
            has_tax_invoice: true,
            model_id: form.modelId,
            model_desc: form.modelDesc,
            situation: form.situation || 0,
          },
        ],
      },
    };
    return data;
  }
  handleNoNote(form: IForm) {
    const data = {
      origin_store_id: form.originStore,
      associate_bike: {
        price: form.price || 0,
        brand: form.brand,
        category: form.category,
        date_of_acquisition: form.acquisitionDate,
        date_of_manufacturing: form.manufactureYear,
        bike_is_orign: form.isOrigin,
        stem_composal: form.stemComposal,
        is_electrical: form.isElectrical,
        bike_use: 1,
        rental_bike: null,
        has_tax_invoice: true,
        model: form.model,
        situation: form.situation || 0,
      },
    };
    return data;
  }
}
