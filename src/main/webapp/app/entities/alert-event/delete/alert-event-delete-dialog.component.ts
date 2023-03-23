import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlertEvent } from '../alert-event.model';
import { AlertEventService } from '../service/alert-event.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './alert-event-delete-dialog.component.html',
})
export class AlertEventDeleteDialogComponent {
  alertEvent?: IAlertEvent;

  constructor(protected alertEventService: AlertEventService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alertEventService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
