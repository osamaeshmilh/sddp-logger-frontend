import { IApplication, NewApplication } from './application.model';

export const sampleWithRequiredData: IApplication = {
  id: 99506,
  name: 'Avon',
  code: 'compressing',
};

export const sampleWithPartialData: IApplication = {
  id: 8899,
  name: 'expedite maroon Cambridgeshire',
  code: 'Metal value-added',
};

export const sampleWithFullData: IApplication = {
  id: 73237,
  name: 'Assurance',
  code: 'Connecticut Pizza methodologies',
  alert_response_codes: 'alarm Malaysia rich',
};

export const sampleWithNewData: NewApplication = {
  name: 'CSS',
  code: 'world-class quantify Codes',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
