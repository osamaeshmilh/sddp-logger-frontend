import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'token',
        data: { pageTitle: 'Tokens' },
        loadChildren: () => import('./token/token.module').then(m => m.TokenModule),
      },
      {
        path: 'application',
        data: { pageTitle: 'Applications' },
        loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
      },
      {
        path: 'organization',
        data: { pageTitle: 'Organizations' },
        loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
      },
      {
        path: 'http-log',
        data: { pageTitle: 'HttpLogs' },
        loadChildren: () => import('./http-log/http-log.module').then(m => m.HttpLogModule),
      },
      {
        path: 'alert-event',
        data: { pageTitle: 'AlertEvents' },
        loadChildren: () => import('./alert-event/alert-event.module').then(m => m.AlertEventModule),
      },
      {
        path: 'alert-subscriber',
        data: { pageTitle: 'alert_subscribers' },
        loadChildren: () => import('./alert-subscriber/alert-subscriber.module').then(m => m.AlertSubscriberModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
