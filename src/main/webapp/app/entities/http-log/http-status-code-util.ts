import { HttpStatusCode } from '../enumerations/http-status-code.model';

export class HttpStatusCodeUtils {
  static getName(code: number): string {
    return (Object.keys(HttpStatusCode) as Array<keyof typeof HttpStatusCode>).find(key => HttpStatusCode[key] === code) || '';
  }
}
