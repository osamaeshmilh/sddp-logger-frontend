import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HttpLogComponent } from './list/http-log.component';
import { HttpLogDetailComponent } from './detail/http-log-detail.component';
import { HttpLogUpdateComponent } from './update/http-log-update.component';
import { HttpLogDeleteDialogComponent } from './delete/http-log-delete-dialog.component';
import { HttpLogRoutingModule } from './route/http-log-routing.module';

@NgModule({
  imports: [SharedModule, HttpLogRoutingModule],
  declarations: [HttpLogComponent, HttpLogDetailComponent, HttpLogUpdateComponent, HttpLogDeleteDialogComponent],
})
export class HttpLogModule {}
