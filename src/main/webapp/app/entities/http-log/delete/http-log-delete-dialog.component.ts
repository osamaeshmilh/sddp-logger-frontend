import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHttpLog } from '../http-log.model';
import { HttpLogService } from '../service/http-log.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './http-log-delete-dialog.component.html',
})
export class HttpLogDeleteDialogComponent {
  httpLog?: IHttpLog;

  constructor(protected httpLogService: HttpLogService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.httpLogService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
