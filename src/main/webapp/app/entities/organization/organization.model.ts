export interface IOrganization {
  id: number;
  name?: string | null;
  code?: string | null;
  address?: string | null;
  email?: string | null;
}

export type NewOrganization = Omit<IOrganization, 'id'> & { id: null };
