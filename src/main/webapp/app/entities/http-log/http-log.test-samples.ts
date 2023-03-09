import dayjs from 'dayjs/esm';

import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { HttpStatusCode } from 'app/entities/enumerations/http-status-code.model';

import { IHttpLog, NewHttpLog } from './http-log.model';

export const sampleWithRequiredData: IHttpLog = {
  id: 6245,
  requestTimestamp: dayjs('2023-03-09T07:22'),
  httpMethod: HttpMethod['GET'],
  requestUrl: 'lavender Books',
  httpStatusCode: HttpStatusCode['REQUEST_TIMEOUT'],
  remoteIPAddress: 'non-volatile',
  duration: 63285,
  requestHeaders: 'index',
  responseHeaders: 'Credit',
};

export const sampleWithPartialData: IHttpLog = {
  id: 32292,
  requestTimestamp: dayjs('2023-03-08T21:40'),
  httpMethod: HttpMethod['PATCH'],
  requestUrl: 'bus blue',
  httpStatusCode: HttpStatusCode['REQUEST_URI_TOO_LONG'],
  remoteIPAddress: 'Proactive 24/365',
  duration: 18106,
  requestHeaders: 'Pizza applications Architect',
  responseHeaders: 'Frozen',
};

export const sampleWithFullData: IHttpLog = {
  id: 66604,
  requestTimestamp: dayjs('2023-03-08T18:35'),
  httpMethod: HttpMethod['HEAD'],
  requestUrl: 'navigating Assurance',
  httpStatusCode: HttpStatusCode['EXPECTATION_FAILED'],
  remoteIPAddress: 'Director',
  duration: 62937,
  requestHeaders: 'alarm Madagascar',
  responseHeaders: 'Shirt',
  requestURLParameters: 'Glens',
  requestBody: 'Synchronised content-based Dynamic',
  requestCookies: 'payment connecting Iowa',
  responseCookies: 'Toys',
};

export const sampleWithNewData: NewHttpLog = {
  requestTimestamp: dayjs('2023-03-09T07:58'),
  httpMethod: HttpMethod['PUT'],
  requestUrl: 'Rustic drive Rustic',
  httpStatusCode: HttpStatusCode['PARTIAL_CONTENT'],
  remoteIPAddress: 'Micronesia Pennsylvania Automotive',
  duration: 60683,
  requestHeaders: 'Buckinghamshire',
  responseHeaders: 'Mauritius',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
