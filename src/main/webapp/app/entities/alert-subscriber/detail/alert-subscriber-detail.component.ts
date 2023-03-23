import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlertSubscriber } from '../alert-subscriber.model';

@Component({
  selector: 'jhi-alert-subscriber-detail',
  templateUrl: './alert-subscriber-detail.component.html',
})
export class AlertSubscriberDetailComponent implements OnInit {
  alertSubscriber: IAlertSubscriber | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alertSubscriber }) => {
      this.alertSubscriber = alertSubscriber;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
