import { IAlertSubscriber } from 'app/entities/alert-subscriber/alert-subscriber.model';

export interface IAlertEvent {
  id: number;
  code?: string | null;
  application_code?: string | null;
  is_sent?: boolean | null;
  alertSubscriber?: Pick<IAlertSubscriber, 'id' | 'name'> | null;
}

export type NewAlertEvent = Omit<IAlertEvent, 'id'> & { id: null };
