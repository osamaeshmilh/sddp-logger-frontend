import dayjs from 'dayjs/esm';
import { IApplication } from 'app/entities/application/application.model';

export interface IToken {
  id: number;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiryDate?: dayjs.Dayjs | null;
  isActive?: boolean | null;
  application?: Pick<IApplication, 'id' | 'code'> | null;
}

export type NewToken = Omit<IToken, 'id'> & { id: null };
