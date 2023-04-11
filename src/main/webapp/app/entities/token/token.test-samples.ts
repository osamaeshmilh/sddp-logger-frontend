import dayjs from 'dayjs/esm';

import { IToken, NewToken } from './token.model';

export const sampleWithRequiredData: IToken = {
  id: 45614,
  access_token: 'Markets Central',
  is_active: false,
};

export const sampleWithPartialData: IToken = {
  id: 54781,
  access_token: 'e-tailers Maine',
  expiry_date: dayjs('2023-03-09'),
  is_active: true,
};

export const sampleWithFullData: IToken = {
  id: 66387,
  access_token: 'revolutionize Metal generating',
  refresh_token: 'Factors',
  expiry_date: dayjs('2023-03-08'),
  is_active: true,
};

export const sampleWithNewData: NewToken = {
  access_token: 'Lebanese',
  is_active: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
