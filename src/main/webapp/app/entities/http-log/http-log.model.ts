import dayjs from 'dayjs/esm';
import { IApplication } from 'app/entities/application/application.model';
import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { HttpStatusCode } from 'app/entities/enumerations/http-status-code.model';

export interface IHttpLog {
  id: number;
  requestTimestamp?: dayjs.Dayjs | null;
  httpMethod?: HttpMethod | null;
  requestUrl?: string | null;
  httpStatusCode?: HttpStatusCode | null;
  remoteIPAddress?: string | null;
  duration?: number | null;
  requestHeaders?: string | null;
  responseHeaders?: string | null;
  requestURLParameters?: string | null;
  requestBody?: string | null;
  requestCookies?: string | null;
  responseCookies?: string | null;
  application?: Pick<IApplication, 'id' | 'code'> | null;
}

export type NewHttpLog = Omit<IHttpLog, 'id'> & { id: null };
