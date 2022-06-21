import { APIAuthBase } from "@/api/auth";
import { IEvent, IFormCheckin } from "@/types/events";

interface IGetEventDTO {
  id?: string;
  type?: string;
}

class EventsService extends APIAuthBase {
  async getEvent(eventTDO: IGetEventDTO): Promise<IEvent[]> {
    const id = eventTDO.id || "";
    const url = `/api/bike-event/events/bike-events/${id}?type=${eventTDO.type}`;
    return await this.request({ url, method: "GET" });
  }

  async doCheckin(form: IFormCheckin) {
    const url = `/api/bike-event/bike-event-user/checkin/`;
    const data = {
      ...form,
    };
    console.log(data);
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
