import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlertSubscriber } from '../alert-subscriber.model';
import { AlertSubscriberService } from '../service/alert-subscriber.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './alert-subscriber-delete-dialog.component.html',
})
export class AlertSubscriberDeleteDialogComponent {
  alertSubscriber?: IAlertSubscriber;

  constructor(protected alertSubscriberService: AlertSubscriberService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alertSubscriberService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
