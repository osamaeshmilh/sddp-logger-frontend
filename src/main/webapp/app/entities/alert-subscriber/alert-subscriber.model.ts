import { IApplication } from 'app/entities/application/application.model';

export interface IAlertSubscriber {
  id: number;
  name?: string | null;
  email?: string | null;
  applications?: Pick<IApplication, 'id'>[] | null;
}

export type NewAlertSubscriber = Omit<IAlertSubscriber, 'id'> & { id: null };
