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
        Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NTExNDUyLCJqdGkiOiI0YzYwNGQxOTdkY2Y0ZDY0OTJjOGNkNjQ3MzQ5MGI3MyIsInVzZXJfaWQiOjIwMjM3LCJmaXJzdF9uYW1lIjoiVmluaWNpdXMgQ2Fpblx1MDBlMyIsInJvbGUiOlsic3VwZXJ1c2VyIl0sInByb2R1Y3RzIjpbXSwicHJvZ3JhbXMiOltdfQ.QpVtx-TKAqzhztXkQqI9LQ4pF6t3xfOBqZwrEe595Ok"}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const eventService = new EventsService();

export { eventService, EventsService };
