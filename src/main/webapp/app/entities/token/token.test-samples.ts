import dayjs from 'dayjs/esm';

import { IToken, NewToken } from './token.model';

export const sampleWithRequiredData: IToken = {
  id: 45614,
  accessToken: 'Markets Central',
  isActive: false,
};

export const sampleWithPartialData: IToken = {
  id: 54781,
  accessToken: 'e-tailers Maine',
  expiryDate: dayjs('2023-03-09'),
  isActive: true,
};

export const sampleWithFullData: IToken = {
  id: 66387,
  accessToken: 'revolutionize Metal generating',
  refreshToken: 'Factors',
  expiryDate: dayjs('2023-03-08'),
  isActive: true,
};

export const sampleWithNewData: NewToken = {
  accessToken: 'Lebanese',
  isActive: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
