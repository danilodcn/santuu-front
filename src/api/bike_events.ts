import { APIBase } from "./index";

export class EventsService extends APIBase {
  async GetEvents() {
    const url = `/dashboard/bike/events/get-events/`;
    return await this.request({ url, method: "GET" });
  }
}
