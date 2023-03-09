import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHttpLog } from '../http-log.model';
import { HttpLogService } from '../service/http-log.service';

@Injectable({ providedIn: 'root' })
export class HttpLogRoutingResolveService implements Resolve<IHttpLog | null> {
  constructor(protected service: HttpLogService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHttpLog | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((httpLog: HttpResponse<IHttpLog>) => {
          if (httpLog.body) {
            return of(httpLog.body);
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
