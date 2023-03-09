import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpLogFormGroup, HttpLogFormService } from './http-log-form.service';
import { IHttpLog } from '../http-log.model';
import { HttpLogService } from '../service/http-log.service';
import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';
import { HttpMethod } from 'app/entities/enumerations/http-method.model';
import { HttpStatusCode } from 'app/entities/enumerations/http-status-code.model';

@Component({
  selector: 'jhi-http-log-update',
  templateUrl: './http-log-update.component.html',
})
export class HttpLogUpdateComponent implements OnInit {
  isSaving = false;
  httpLog: IHttpLog | null = null;
  httpMethodValues = Object.keys(HttpMethod);
  httpStatusCodeValues = Object.keys(HttpStatusCode);

  applicationsSharedCollection: IApplication[] = [];

  editForm: HttpLogFormGroup = this.httpLogFormService.createHttpLogFormGroup();

  constructor(
    protected httpLogService: HttpLogService,
    protected httpLogFormService: HttpLogFormService,
    protected applicationService: ApplicationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareApplication = (o1: IApplication | null, o2: IApplication | null): boolean => this.applicationService.compareApplication(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ httpLog }) => {
      this.httpLog = httpLog;
      if (httpLog) {
        this.updateForm(httpLog);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const httpLog = this.httpLogFormService.getHttpLog(this.editForm);
    if (httpLog.id !== null) {
      this.subscribeToSaveResponse(this.httpLogService.update(httpLog));
    } else {
      this.subscribeToSaveResponse(this.httpLogService.create(httpLog));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHttpLog>>): void {
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

  protected updateForm(httpLog: IHttpLog): void {
    this.httpLog = httpLog;
    this.httpLogFormService.resetForm(this.editForm, httpLog);

    this.applicationsSharedCollection = this.applicationService.addApplicationToCollectionIfMissing<IApplication>(
      this.applicationsSharedCollection,
      httpLog.application
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationService
      .query()
      .pipe(map((res: HttpResponse<IApplication[]>) => res.body ?? []))
      .pipe(
        map((applications: IApplication[]) =>
          this.applicationService.addApplicationToCollectionIfMissing<IApplication>(applications, this.httpLog?.application)
        )
      )
      .subscribe((applications: IApplication[]) => (this.applicationsSharedCollection = applications));
  }
}
