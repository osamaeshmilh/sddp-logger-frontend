import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AlertSubscriberFormGroup, AlertSubscriberFormService } from './alert-subscriber-form.service';
import { IAlertSubscriber } from '../alert-subscriber.model';
import { AlertSubscriberService } from '../service/alert-subscriber.service';
import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';

@Component({
  selector: 'jhi-alert-subscriber-update',
  templateUrl: './alert-subscriber-update.component.html',
})
export class AlertSubscriberUpdateComponent implements OnInit {
  isSaving = false;
  alertSubscriber: IAlertSubscriber | null = null;

  applicationsSharedCollection: IApplication[] = [];

  editForm: AlertSubscriberFormGroup = this.alertSubscriberFormService.createAlertSubscriberFormGroup();

  constructor(
    protected alertSubscriberService: AlertSubscriberService,
    protected alertSubscriberFormService: AlertSubscriberFormService,
    protected applicationService: ApplicationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareApplication = (o1: IApplication | null, o2: IApplication | null): boolean => this.applicationService.compareApplication(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alertSubscriber }) => {
      this.alertSubscriber = alertSubscriber;
      if (alertSubscriber) {
        this.updateForm(alertSubscriber);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alertSubscriber = this.alertSubscriberFormService.getAlertSubscriber(this.editForm);
    if (alertSubscriber.id !== null) {
      this.subscribeToSaveResponse(this.alertSubscriberService.update(alertSubscriber));
    } else {
      this.subscribeToSaveResponse(this.alertSubscriberService.create(alertSubscriber));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlertSubscriber>>): void {
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

  protected updateForm(alertSubscriber: IAlertSubscriber): void {
    this.alertSubscriber = alertSubscriber;
    this.alertSubscriberFormService.resetForm(this.editForm, alertSubscriber);

    this.applicationsSharedCollection = this.applicationService.addApplicationToCollectionIfMissing<IApplication>(
      this.applicationsSharedCollection,
      ...(alertSubscriber.applications ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationService
      .query()
      .pipe(map((res: HttpResponse<IApplication[]>) => res.body ?? []))
      .pipe(
        map((applications: IApplication[]) =>
          this.applicationService.addApplicationToCollectionIfMissing<IApplication>(
            applications,
            ...(this.alertSubscriber?.applications ?? [])
          )
        )
      )
      .subscribe((applications: IApplication[]) => (this.applicationsSharedCollection = applications));
  }
}
