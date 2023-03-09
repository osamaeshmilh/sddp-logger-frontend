import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TokenComponent } from './list/token.component';
import { TokenDetailComponent } from './detail/token-detail.component';
import { TokenUpdateComponent } from './update/token-update.component';
import { TokenDeleteDialogComponent } from './delete/token-delete-dialog.component';
import { TokenRoutingModule } from './route/token-routing.module';

@NgModule({
  imports: [SharedModule, TokenRoutingModule],
  declarations: [TokenComponent, TokenDetailComponent, TokenUpdateComponent, TokenDeleteDialogComponent],
})
export class TokenModule {}
