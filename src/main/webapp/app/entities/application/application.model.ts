import { IOrganization } from 'app/entities/organization/organization.model';

export interface IApplication {
  id: number;
  name?: string | null;
  code?: string | null;
  organization?: Pick<IOrganization, 'id' | 'code'> | null;
}

export type NewApplication = Omit<IApplication, 'id'> & { id: null };
