import { IForm, INextStepDTO } from "@/types/simulation";

export class SimulationHelper {
  handle(form: IForm): INextStepDTO {
    console.log(form);

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
}
