import { IOrganization } from 'app/entities/organization/organization.model';
import { IAlertSubscriber } from 'app/entities/alert-subscriber/alert-subscriber.model';

export interface IApplication {
  id: number;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  alert_response_codes?: string | null;
  organization_id?: number | null;
  organization?: Pick<IOrganization, 'id' | 'code'> | null;
  alert_subscribers?: Pick<IAlertSubscriber, 'id'>[] | null;
}

export type NewApplication = Omit<IApplication, 'id'> & { id: null };
