import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlertEvent } from '../alert-event.model';

@Component({
  selector: 'jhi-alert-event-detail',
  templateUrl: './alert-event-detail.component.html',
})
export class AlertEventDetailComponent implements OnInit {
  alertEvent: IAlertEvent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alertEvent }) => {
      this.alertEvent = alertEvent;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
