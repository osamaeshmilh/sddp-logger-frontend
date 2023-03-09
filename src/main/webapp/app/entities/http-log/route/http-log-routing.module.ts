import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HttpLogComponent } from '../list/http-log.component';
import { HttpLogDetailComponent } from '../detail/http-log-detail.component';
import { HttpLogUpdateComponent } from '../update/http-log-update.component';
import { HttpLogRoutingResolveService } from './http-log-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const httpLogRoute: Routes = [
  {
    path: '',
    component: HttpLogComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HttpLogDetailComponent,
    resolve: {
      httpLog: HttpLogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HttpLogUpdateComponent,
    resolve: {
      httpLog: HttpLogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HttpLogUpdateComponent,
    resolve: {
      httpLog: HttpLogRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(httpLogRoute)],
  exports: [RouterModule],
})
export class HttpLogRoutingModule {}
