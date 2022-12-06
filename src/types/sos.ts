export interface IOrder {
  id: number;
  associate: number;
  service_bike: number;
  service_bike_model: string;
  service_bike_brand: string;
  service_type: number;
  service_text: string;
  service_bike_lane: number;
  service_ref_location: string;
  mechanic: number;
  mechanic_name: string;
  service_status: number;
  service_protocol: string;
  status_text: string;
  img_detail1: undefined;
  img_detail2: undefined;
  img_detail3: undefined;
}

export interface ISosCallForm {
  associate_cpf: string;
  associate_name: string;
  service_bike: undefined;
  service_bike_model: string;
  service_bike_brand: string;
  service_bike_lane: number;
  service_type: number;
  service_text: string;
  service_ref_location: string;
  img_detail1?: File;
  img_detail2?: File;
  img_detail3?: File;
  associated_coordinates: string;
  service_address: string;
}
