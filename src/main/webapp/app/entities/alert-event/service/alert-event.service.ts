import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlertEvent, NewAlertEvent } from '../alert-event.model';

export type PartialUpdateAlertEvent = Partial<IAlertEvent> & Pick<IAlertEvent, 'id'>;

export type EntityResponseType = HttpResponse<IAlertEvent>;
export type EntityArrayResponseType = HttpResponse<IAlertEvent[]>;

@Injectable({ providedIn: 'root' })
export class AlertEventService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alert-events');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(alertEvent: NewAlertEvent): Observable<EntityResponseType> {
    return this.http.post<IAlertEvent>(this.resourceUrl, alertEvent, { observe: 'response' });
  }

  update(alertEvent: IAlertEvent): Observable<EntityResponseType> {
    return this.http.put<IAlertEvent>(`${this.resourceUrl}/${this.getAlertEventIdentifier(alertEvent)}`, alertEvent, {
      observe: 'response',
    });
  }

  partialUpdate(alertEvent: PartialUpdateAlertEvent): Observable<EntityResponseType> {
    return this.http.patch<IAlertEvent>(`${this.resourceUrl}/${this.getAlertEventIdentifier(alertEvent)}`, alertEvent, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlertEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlertEvent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAlertEventIdentifier(alertEvent: Pick<IAlertEvent, 'id'>): number {
    return alertEvent.id;
  }

  compareAlertEvent(o1: Pick<IAlertEvent, 'id'> | null, o2: Pick<IAlertEvent, 'id'> | null): boolean {
    return o1 && o2 ? this.getAlertEventIdentifier(o1) === this.getAlertEventIdentifier(o2) : o1 === o2;
  }

  addAlertEventToCollectionIfMissing<Type extends Pick<IAlertEvent, 'id'>>(
    alertEventCollection: Type[],
    ...alertEventsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const alertEvents: Type[] = alertEventsToCheck.filter(isPresent);
    if (alertEvents.length > 0) {
      const alertEventCollectionIdentifiers = alertEventCollection.map(alertEventItem => this.getAlertEventIdentifier(alertEventItem)!);
      const alertEventsToAdd = alertEvents.filter(alertEventItem => {
        const alertEventIdentifier = this.getAlertEventIdentifier(alertEventItem);
        if (alertEventCollectionIdentifiers.includes(alertEventIdentifier)) {
          return false;
        }
        alertEventCollectionIdentifiers.push(alertEventIdentifier);
        return true;
      });
      return [...alertEventsToAdd, ...alertEventCollection];
    }
    return alertEventCollection;
  }
}
