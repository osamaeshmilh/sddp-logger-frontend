import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IToken } from '../token.model';
import { TokenService } from '../service/token.service';

@Injectable({ providedIn: 'root' })
export class TokenRoutingResolveService implements Resolve<IToken | null> {
  constructor(protected service: TokenService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IToken | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((token: HttpResponse<IToken>) => {
          if (token.body) {
            return of(token.body);
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
