import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlertSubscriber } from '../alert-subscriber.model';
import { alert_subscriberservice } from '../service/alert-subscriber.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './alert-subscriber-delete-dialog.component.html',
})
export class AlertSubscriberDeleteDialogComponent {
  alertSubscriber?: IAlertSubscriber;

  constructor(protected alert_subscriberservice: alert_subscriberservice, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alert_subscriberservice.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
