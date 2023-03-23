import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlertEventComponent } from './list/alert-event.component';
import { AlertEventDetailComponent } from './detail/alert-event-detail.component';
import { AlertEventUpdateComponent } from './update/alert-event-update.component';
import { AlertEventDeleteDialogComponent } from './delete/alert-event-delete-dialog.component';
import { AlertEventRoutingModule } from './route/alert-event-routing.module';

@NgModule({
  imports: [SharedModule, AlertEventRoutingModule],
  declarations: [AlertEventComponent, AlertEventDetailComponent, AlertEventUpdateComponent, AlertEventDeleteDialogComponent],
})
export class AlertEventModule {}
