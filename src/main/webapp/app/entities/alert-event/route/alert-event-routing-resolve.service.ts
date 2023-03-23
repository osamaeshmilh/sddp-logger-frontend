import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlertEvent } from '../alert-event.model';
import { AlertEventService } from '../service/alert-event.service';

@Injectable({ providedIn: 'root' })
export class AlertEventRoutingResolveService implements Resolve<IAlertEvent | null> {
  constructor(protected service: AlertEventService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlertEvent | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alertEvent: HttpResponse<IAlertEvent>) => {
          if (alertEvent.body) {
            return of(alertEvent.body);
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
