import { IOrganization, NewOrganization } from './organization.model';

export const sampleWithRequiredData: IOrganization = {
  id: 12784,
  name: 'Automated Rial',
  code: 'Hawaii TCP',
  address: 'Arizona quantify systems',
  email: 'Maegan_Hintz@hotmail.com',
};

export const sampleWithPartialData: IOrganization = {
  id: 85029,
  name: 'invoice Orchestrator',
  code: 'Fish Sports',
  address: 'Web',
  email: 'Alec.Emard@hotmail.com',
};

export const sampleWithFullData: IOrganization = {
  id: 28603,
  name: 'e-markets Games',
  code: 'Metal',
  address: 'payment bypass',
  email: 'Roel98@hotmail.com',
};

export const sampleWithNewData: NewOrganization = {
  name: 'Phased Architect clear-thinking',
  code: 'U.S.',
  address: 'Future Implementation turn-key',
  email: 'Shanna.Terry@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
