import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlertSubscriberComponent } from './list/alert-subscriber.component';
import { AlertSubscriberDetailComponent } from './detail/alert-subscriber-detail.component';
import { AlertSubscriberUpdateComponent } from './update/alert-subscriber-update.component';
import { AlertSubscriberDeleteDialogComponent } from './delete/alert-subscriber-delete-dialog.component';
import { AlertSubscriberRoutingModule } from './route/alert-subscriber-routing.module';

@NgModule({
  imports: [SharedModule, AlertSubscriberRoutingModule],
  declarations: [
    AlertSubscriberComponent,
    AlertSubscriberDetailComponent,
    AlertSubscriberUpdateComponent,
    AlertSubscriberDeleteDialogComponent,
  ],
})
export class AlertSubscriberModule {}
