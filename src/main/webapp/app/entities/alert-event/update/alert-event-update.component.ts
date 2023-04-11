import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AlertEventFormGroup, AlertEventFormService } from './alert-event-form.service';
import { IAlertEvent } from '../alert-event.model';
import { AlertEventService } from '../service/alert-event.service';
import { IAlertSubscriber } from 'app/entities/alert-subscriber/alert-subscriber.model';
import { alert_subscriberservice } from 'app/entities/alert-subscriber/service/alert-subscriber.service';

@Component({
  selector: 'jhi-alert-event-update',
  templateUrl: './alert-event-update.component.html',
})
export class AlertEventUpdateComponent implements OnInit {
  isSaving = false;
  alertEvent: IAlertEvent | null = null;

  alert_subscribersSharedCollection: IAlertSubscriber[] = [];

  editForm: AlertEventFormGroup = this.alertEventFormService.createAlertEventFormGroup();

  constructor(
    protected alertEventService: AlertEventService,
    protected alertEventFormService: AlertEventFormService,
    protected alert_subscriberservice: alert_subscriberservice,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAlertSubscriber = (o1: IAlertSubscriber | null, o2: IAlertSubscriber | null): boolean =>
    this.alert_subscriberservice.compareAlertSubscriber(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alertEvent }) => {
      this.alertEvent = alertEvent;
      if (alertEvent) {
        this.updateForm(alertEvent);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alertEvent = this.alertEventFormService.getAlertEvent(this.editForm);
    if (alertEvent.id !== null) {
      this.subscribeToSaveResponse(this.alertEventService.update(alertEvent));
    } else {
      this.subscribeToSaveResponse(this.alertEventService.create(alertEvent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlertEvent>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(alertEvent: IAlertEvent): void {
    this.alertEvent = alertEvent;
    this.alertEventFormService.resetForm(this.editForm, alertEvent);

    this.alert_subscribersSharedCollection = this.alert_subscriberservice.addAlertSubscriberToCollectionIfMissing<IAlertSubscriber>(
      this.alert_subscribersSharedCollection,
      alertEvent.alertSubscriber
    );
  }

  protected loadRelationshipsOptions(): void {
    this.alert_subscriberservice
      .query()
      .pipe(map((res: HttpResponse<IAlertSubscriber[]>) => res.body ?? []))
      .pipe(
        map((alert_subscribers: IAlertSubscriber[]) =>
          this.alert_subscriberservice.addAlertSubscriberToCollectionIfMissing<IAlertSubscriber>(
            alert_subscribers,
            this.alertEvent?.alertSubscriber
          )
        )
      )
      .subscribe((alert_subscribers: IAlertSubscriber[]) => (this.alert_subscribersSharedCollection = alert_subscribers));
  }
}
