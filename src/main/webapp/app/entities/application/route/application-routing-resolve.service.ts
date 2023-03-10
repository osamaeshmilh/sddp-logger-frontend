import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApplication } from '../application.model';
import { ApplicationService } from '../service/application.service';

@Injectable({ providedIn: 'root' })
export class ApplicationRoutingResolveService implements Resolve<IApplication | null> {
  constructor(protected service: ApplicationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApplication | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((application: HttpResponse<IApplication>) => {
          if (application.body) {
            return of(application.body);
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
