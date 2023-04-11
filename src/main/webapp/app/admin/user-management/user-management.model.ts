export interface IUser {
  id: number | null;
  email?: string;
  reset_password_token?: string | null;
  reset_password_sent_at?: Date | null;
  remember_created_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  first_name?: string | null;
  last_name?: string | null;
  organisation_id?: number | null;
  authorities?: string[];
  activated?: boolean;
}

export class User implements IUser {
  constructor(
    public id: number | null,
    public email?: string,
    public reset_password_token?: string | null,
    public reset_password_sent_at?: Date | null,
    public remember_created_at?: Date | null,
    public created_at?: Date,
    public updated_at?: Date,
    public first_name?: string | null,
    public last_name?: string | null,
    public organisation_id?: number | null,
    public authorities?: string[],
    public activated?: boolean
  ) {}
}
