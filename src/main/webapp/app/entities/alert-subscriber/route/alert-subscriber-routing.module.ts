import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlertSubscriberComponent } from '../list/alert-subscriber.component';
import { AlertSubscriberDetailComponent } from '../detail/alert-subscriber-detail.component';
import { AlertSubscriberUpdateComponent } from '../update/alert-subscriber-update.component';
import { AlertSubscriberRoutingResolveService } from './alert-subscriber-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const alertSubscriberRoute: Routes = [
  {
    path: '',
    component: AlertSubscriberComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlertSubscriberDetailComponent,
    resolve: {
      alertSubscriber: AlertSubscriberRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlertSubscriberUpdateComponent,
    resolve: {
      alertSubscriber: AlertSubscriberRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlertSubscriberUpdateComponent,
    resolve: {
      alertSubscriber: AlertSubscriberRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alertSubscriberRoute)],
  exports: [RouterModule],
})
export class AlertSubscriberRoutingModule {}
