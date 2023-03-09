import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TokenComponent } from '../list/token.component';
import { TokenDetailComponent } from '../detail/token-detail.component';
import { TokenUpdateComponent } from '../update/token-update.component';
import { TokenRoutingResolveService } from './token-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const tokenRoute: Routes = [
  {
    path: '',
    component: TokenComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TokenDetailComponent,
    resolve: {
      token: TokenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TokenUpdateComponent,
    resolve: {
      token: TokenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TokenUpdateComponent,
    resolve: {
      token: TokenRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tokenRoute)],
  exports: [RouterModule],
})
export class TokenRoutingModule {}
