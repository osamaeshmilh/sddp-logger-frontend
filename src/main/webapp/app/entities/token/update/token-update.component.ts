import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TokenFormGroup, TokenFormService } from './token-form.service';
import { IToken } from '../token.model';
import { TokenService } from '../service/token.service';
import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';

@Component({
  selector: 'jhi-token-update',
  templateUrl: './token-update.component.html',
})
export class TokenUpdateComponent implements OnInit {
  isSaving = false;
  token: IToken | null = null;

  applicationsSharedCollection: IApplication[] = [];

  editForm: TokenFormGroup = this.tokenFormService.createTokenFormGroup();

  constructor(
    protected tokenService: TokenService,
    protected tokenFormService: TokenFormService,
    protected applicationService: ApplicationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareApplication = (o1: IApplication | null, o2: IApplication | null): boolean => this.applicationService.compareApplication(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ token }) => {
      this.token = token;
      if (token) {
        this.updateForm(token);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const token = this.tokenFormService.getToken(this.editForm);
    if (token.id !== null) {
      this.subscribeToSaveResponse(this.tokenService.update(token));
    } else {
      this.subscribeToSaveResponse(this.tokenService.create(token));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IToken>>): void {
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

  protected updateForm(token: IToken): void {
    this.token = token;
    this.tokenFormService.resetForm(this.editForm, token);

    this.applicationsSharedCollection = this.applicationService.addApplicationToCollectionIfMissing<IApplication>(
      this.applicationsSharedCollection,
      token.application
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationService
      .query()
      .pipe(map((res: HttpResponse<IApplication[]>) => res.body ?? []))
      .pipe(
        map((applications: IApplication[]) =>
          this.applicationService.addApplicationToCollectionIfMissing<IApplication>(applications, this.token?.application)
        )
      )
      .subscribe((applications: IApplication[]) => (this.applicationsSharedCollection = applications));
  }
}
