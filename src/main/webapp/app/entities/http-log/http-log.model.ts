import dayjs from 'dayjs/esm';
import { IApplication } from 'app/entities/application/application.model';
import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { HttpStatusCode } from 'app/entities/enumerations/http-status-code.model';

export interface IHttpLog {
  id: number;
  request_timestamp?: dayjs.Dayjs | null;
  http_method?: HttpMethod | null;
  request_url?: string | null;
  http_status_code?: HttpStatusCode | null;
  remote_ip_address?: string | null;
  duration?: number | null;
  request_headers?: string | null;
  response_headers?: string | null;
  request_url_parameters?: string | null;
  request_body?: string | null;
  request_cookies?: string | null;
  response_cookies?: string | null;
  application_id?: number | null;
  application?: Pick<IApplication, 'id' | 'code'> | null;
}

export type NewHttpLog = Omit<IHttpLog, 'id'> & { id: null };
