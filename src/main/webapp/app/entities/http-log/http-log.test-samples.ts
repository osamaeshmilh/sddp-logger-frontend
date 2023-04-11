import dayjs from 'dayjs/esm';

import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { HttpStatusCode } from 'app/entities/enumerations/http-status-code.model';

import { IHttpLog, NewHttpLog } from './http-log.model';

export const sampleWithRequiredData: IHttpLog = {
  id: 6245,
  request_timestamp: dayjs('2023-03-09T07:22'),
  http_method: HttpMethod['GET'],
  request_url: 'lavender Books',
  http_status_code: HttpStatusCode['REQUEST_TIMEOUT'],
  remote_ip_address: 'non-volatile',
  duration: 63285,
  request_headers: 'index',
  response_headers: 'Credit',
};

export const sampleWithPartialData: IHttpLog = {
  id: 32292,
  request_timestamp: dayjs('2023-03-08T21:40'),
  http_method: HttpMethod['PATCH'],
  request_url: 'bus blue',
  http_status_code: HttpStatusCode['REQUEST_URI_TOO_LONG'],
  remote_ip_address: 'Proactive 24/365',
  duration: 18106,
  request_headers: 'Pizza applications Architect',
  response_headers: 'Frozen',
};

export const sampleWithFullData: IHttpLog = {
  id: 66604,
  request_timestamp: dayjs('2023-03-08T18:35'),
  http_method: HttpMethod['HEAD'],
  request_url: 'navigating Assurance',
  http_status_code: HttpStatusCode['EXPECTATION_FAILED'],
  remote_ip_address: 'Director',
  duration: 62937,
  request_headers: 'alarm Madagascar',
  response_headers: 'Shirt',
  request_url_parameters: 'Glens',
  request_body: 'Synchronised content-based Dynamic',
  request_cookies: 'payment connecting Iowa',
  response_cookies: 'Toys',
};

export const sampleWithNewData: NewHttpLog = {
  request_timestamp: dayjs('2023-03-09T07:58'),
  http_method: HttpMethod['PUT'],
  request_url: 'Rustic drive Rustic',
  http_status_code: HttpStatusCode['PARTIAL_CONTENT'],
  remote_ip_address: 'Micronesia Pennsylvania Automotive',
  duration: 60683,
  request_headers: 'Buckinghamshire',
  response_headers: 'Mauritius',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
