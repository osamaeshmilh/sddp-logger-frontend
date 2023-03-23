import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlertEventComponent } from '../list/alert-event.component';
import { AlertEventDetailComponent } from '../detail/alert-event-detail.component';
import { AlertEventUpdateComponent } from '../update/alert-event-update.component';
import { AlertEventRoutingResolveService } from './alert-event-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const alertEventRoute: Routes = [
  {
    path: '',
    component: AlertEventComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlertEventDetailComponent,
    resolve: {
      alertEvent: AlertEventRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlertEventUpdateComponent,
    resolve: {
      alertEvent: AlertEventRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlertEventUpdateComponent,
    resolve: {
      alertEvent: AlertEventRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alertEventRoute)],
  exports: [RouterModule],
})
export class AlertEventRoutingModule {}
