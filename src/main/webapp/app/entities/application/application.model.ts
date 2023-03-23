import { IOrganization } from 'app/entities/organization/organization.model';
import { IAlertSubscriber } from 'app/entities/alert-subscriber/alert-subscriber.model';

export interface IApplication {
  id: number;
  name?: string | null;
  code?: string | null;
  alertResponseCodes?: string | null;
  organization?: Pick<IOrganization, 'id' | 'code'> | null;
  alertSubscribers?: Pick<IAlertSubscriber, 'id'>[] | null;
}

export type NewApplication = Omit<IApplication, 'id'> & { id: null };
