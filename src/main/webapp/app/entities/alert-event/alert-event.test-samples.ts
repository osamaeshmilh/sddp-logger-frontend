import { IAlertEvent, NewAlertEvent } from './alert-event.model';

export const sampleWithRequiredData: IAlertEvent = {
  id: 82763,
};

export const sampleWithPartialData: IAlertEvent = {
  id: 62074,
  code: 'Unbranded',
};

export const sampleWithFullData: IAlertEvent = {
  id: 5714,
  code: 'Robust',
  applicationCode: 'background users convergence',
  isSent: false,
};

export const sampleWithNewData: NewAlertEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
