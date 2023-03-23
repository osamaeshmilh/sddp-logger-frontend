import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlertSubscriber } from '../alert-subscriber.model';
import { AlertSubscriberService } from '../service/alert-subscriber.service';

@Injectable({ providedIn: 'root' })
export class AlertSubscriberRoutingResolveService implements Resolve<IAlertSubscriber | null> {
  constructor(protected service: AlertSubscriberService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlertSubscriber | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alertSubscriber: HttpResponse<IAlertSubscriber>) => {
          if (alertSubscriber.body) {
            return of(alertSubscriber.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
