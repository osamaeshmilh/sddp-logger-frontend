import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHttpLog, NewHttpLog } from '../http-log.model';

export type PartialUpdateHttpLog = Partial<IHttpLog> & Pick<IHttpLog, 'id'>;

type RestOf<T extends IHttpLog | NewHttpLog> = Omit<T, 'requestTimestamp'> & {
  requestTimestamp?: string | null;
};

export type RestHttpLog = RestOf<IHttpLog>;

export type NewRestHttpLog = RestOf<NewHttpLog>;

export type PartialUpdateRestHttpLog = RestOf<PartialUpdateHttpLog>;

export type EntityResponseType = HttpResponse<IHttpLog>;
export type EntityArrayResponseType = HttpResponse<IHttpLog[]>;

@Injectable({ providedIn: 'root' })
export class HttpLogService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/http-logs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(httpLog: NewHttpLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(httpLog);
    return this.http
      .post<RestHttpLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(httpLog: IHttpLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(httpLog);
    return this.http
      .put<RestHttpLog>(`${this.resourceUrl}/${this.getHttpLogIdentifier(httpLog)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(httpLog: PartialUpdateHttpLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(httpLog);
    return this.http
      .patch<RestHttpLog>(`${this.resourceUrl}/${this.getHttpLogIdentifier(httpLog)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHttpLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHttpLog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHttpLogIdentifier(httpLog: Pick<IHttpLog, 'id'>): number {
    return httpLog.id;
  }

  compareHttpLog(o1: Pick<IHttpLog, 'id'> | null, o2: Pick<IHttpLog, 'id'> | null): boolean {
    return o1 && o2 ? this.getHttpLogIdentifier(o1) === this.getHttpLogIdentifier(o2) : o1 === o2;
  }

  addHttpLogToCollectionIfMissing<Type extends Pick<IHttpLog, 'id'>>(
    httpLogCollection: Type[],
    ...httpLogsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const httpLogs: Type[] = httpLogsToCheck.filter(isPresent);
    if (httpLogs.length > 0) {
      const httpLogCollectionIdentifiers = httpLogCollection.map(httpLogItem => this.getHttpLogIdentifier(httpLogItem)!);
      const httpLogsToAdd = httpLogs.filter(httpLogItem => {
        const httpLogIdentifier = this.getHttpLogIdentifier(httpLogItem);
        if (httpLogCollectionIdentifiers.includes(httpLogIdentifier)) {
          return false;
        }
        httpLogCollectionIdentifiers.push(httpLogIdentifier);
        return true;
      });
      return [...httpLogsToAdd, ...httpLogCollection];
    }
    return httpLogCollection;
  }

  protected convertDateFromClient<T extends IHttpLog | NewHttpLog | PartialUpdateHttpLog>(httpLog: T): RestOf<T> {
    return {
      ...httpLog,
      requestTimestamp: httpLog.requestTimestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restHttpLog: RestHttpLog): IHttpLog {
    return {
      ...restHttpLog,
      requestTimestamp: restHttpLog.requestTimestamp ? dayjs(restHttpLog.requestTimestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHttpLog>): HttpResponse<IHttpLog> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHttpLog[]>): HttpResponse<IHttpLog[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
