import { IApplication, NewApplication } from './application.model';

export const sampleWithRequiredData: IApplication = {
  id: 99506,
  name: 'Avon',
  code: 'compressing',
};

export const sampleWithPartialData: IApplication = {
  id: 44826,
  name: 'interface',
  code: 'maroon Cambridgeshire Avon',
};

export const sampleWithFullData: IApplication = {
  id: 66991,
  name: 'Money',
  code: 'program bandwidth',
};

export const sampleWithNewData: NewApplication = {
  name: 'Cotton copying',
  code: 'programming payment Nepal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
