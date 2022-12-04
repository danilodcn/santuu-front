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
}
