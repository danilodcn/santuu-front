import { APIBase } from "./index";

export class ProgramService extends APIBase {
  async getProgram(program_name: string | (string | null)[] = "pqp") {
    const url = `dashboard/proposal/get_program/${program_name}/`;
    return await this.request({ url, method: "GET" });
  }
}
