import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IToken, NewToken } from '../token.model';

export type PartialUpdateToken = Partial<IToken> & Pick<IToken, 'id'>;

type RestOf<T extends IToken | NewToken> = Omit<T, 'expiry_date'> & {
  expiry_date?: string | null;
};

export type RestToken = RestOf<IToken>;

export type NewRestToken = RestOf<NewToken>;

export type PartialUpdateRestToken = RestOf<PartialUpdateToken>;

export type EntityResponseType = HttpResponse<IToken>;
export type EntityArrayResponseType = HttpResponse<IToken[]>;

@Injectable({ providedIn: 'root' })
export class TokenService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tokens');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(token: NewToken): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(token);
    return this.http.post<RestToken>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(token: IToken): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(token);
    return this.http
      .put<RestToken>(`${this.resourceUrl}/${this.getTokenIdentifier(token)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(token: PartialUpdateToken): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(token);
    return this.http
      .patch<RestToken>(`${this.resourceUrl}/${this.getTokenIdentifier(token)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestToken>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestToken[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTokenIdentifier(token: Pick<IToken, 'id'>): number {
    return token.id;
  }

  compareToken(o1: Pick<IToken, 'id'> | null, o2: Pick<IToken, 'id'> | null): boolean {
    return o1 && o2 ? this.getTokenIdentifier(o1) === this.getTokenIdentifier(o2) : o1 === o2;
  }

  addTokenToCollectionIfMissing<Type extends Pick<IToken, 'id'>>(
    tokenCollection: Type[],
    ...tokensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tokens: Type[] = tokensToCheck.filter(isPresent);
    if (tokens.length > 0) {
      const tokenCollectionIdentifiers = tokenCollection.map(tokenItem => this.getTokenIdentifier(tokenItem)!);
      const tokensToAdd = tokens.filter(tokenItem => {
        const tokenIdentifier = this.getTokenIdentifier(tokenItem);
        if (tokenCollectionIdentifiers.includes(tokenIdentifier)) {
          return false;
        }
        tokenCollectionIdentifiers.push(tokenIdentifier);
        return true;
      });
      return [...tokensToAdd, ...tokenCollection];
    }
    return tokenCollection;
  }

  protected convertDateFromClient<T extends IToken | NewToken | PartialUpdateToken>(token: T): RestOf<T> {
    return {
      ...token,
      expiry_date: token.expiry_date?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restToken: RestToken): IToken {
    return {
      ...restToken,
      expiry_date: restToken.expiry_date ? dayjs(restToken.expiry_date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestToken>): HttpResponse<IToken> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestToken[]>): HttpResponse<IToken[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
