import { APIBase } from "./index";
import { IFormCheckin } from "@/types/events";
export class EventsService extends APIBase {
  async GetEvents() {
    const url = `/dashboard/bike/events/get-events/`;
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
        Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NDk5NjM5LCJqdGkiOiJlYjA3NmUyNTYxNDc0NGVkYmExMTgzMjJjNjhiNGI1NCIsInVzZXJfaWQiOjIwMjM3LCJmaXJzdF9uYW1lIjoiVmluaWNpdXMgQ2Fpblx1MDBlMyIsInJvbGUiOlsic3VwZXJ1c2VyIl0sInByb2R1Y3RzIjpbXSwicHJvZ3JhbXMiOltdfQ.nr4MnKZ5ILuloxNAmaRgOyk7Fqr1rWIC0KMSQeDE1NE"}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
