import { APIAuthBase } from "@/api/auth";
import { IEvent, IFormCheckin } from "@/types/events";

interface IGetEventDTO {
  id?: string;
  type?: string;
}

class EventsService extends APIAuthBase {
  async getEvent(eventTDO: IGetEventDTO) {
    const id = eventTDO.id || "";
    const url = `/api/bike-event/events/bike-events/?event_id=${id}&type=${eventTDO.type}`;
    let response = await this.request({ url, method: "GET" });

    if (response.error) {
      return response;
    }

    if (!Array.isArray(response)) {
      response = [response];
    }

    return response;
  }

  async doCheckin(form: IFormCheckin) {
    const url = `/api/bike-event/bike-events-checkin/`;
    const data = {
      ...form,
    };

    return await this.request({
      url,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const eventService = new EventsService();

export { eventService, EventsService };
