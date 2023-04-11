import dayjs from 'dayjs/esm';
import { IApplication } from 'app/entities/application/application.model';

export interface IToken {
  id: number;
  access_token?: string | null;
  refresh_token?: string | null;
  expiry_date?: dayjs.Dayjs | null;
  is_active?: boolean | null;
  application?: Pick<IApplication, 'id' | 'code'> | null;
}

export type NewToken = Omit<IToken, 'id'> & { id: null };
