import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

export const dashboardRoute: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'الرئيسية',
    },
    canActivate: [UserRouteAccessService],
  },
];
