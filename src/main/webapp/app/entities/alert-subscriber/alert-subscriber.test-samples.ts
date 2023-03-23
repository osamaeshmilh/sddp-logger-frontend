import { IAlertSubscriber, NewAlertSubscriber } from './alert-subscriber.model';

export const sampleWithRequiredData: IAlertSubscriber = {
  id: 62761,
  name: 'holistic Home matrix',
  email: 'Emory26@gmail.com',
};

export const sampleWithPartialData: IAlertSubscriber = {
  id: 13327,
  name: 'microchip COM Extended',
  email: 'Vince_Jones17@yahoo.com',
};

export const sampleWithFullData: IAlertSubscriber = {
  id: 90972,
  name: 'Cedi deposit Response',
  email: 'Valentin.Morissette63@yahoo.com',
};

export const sampleWithNewData: NewAlertSubscriber = {
  name: 'compelling Guilder',
  email: 'Creola25@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
