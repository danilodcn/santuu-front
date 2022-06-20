import { APIBase } from "./index";
import { IFormCheckin } from "@/types/events";
export class EventsService extends APIBase {
  async getEvents(event_id = "") {
    const url = `/api/bike-event/bike-events/?id=${event_id}`;
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
      method: "PUT",
      data: data,
      headers: {
        Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzM0OTAyLCJqdGkiOiI5OGRlZjBhNWM4NTE0MjY0YjkzZWEzNWNlZDVhY2ZkYSIsInVzZXJfaWQiOjIwMjM3LCJmaXJzdF9uYW1lIjoiVmluaWNpdXMgQ2Fpblx1MDBlMyIsInJvbGUiOlsic3VwZXJ1c2VyIl0sInByb2R1Y3RzIjpbXSwicHJvZ3JhbXMiOltdfQ.z8hEYT4lmWfU5EhAGUC68BwlQQTg9AKEyezh0yhoMug"}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
