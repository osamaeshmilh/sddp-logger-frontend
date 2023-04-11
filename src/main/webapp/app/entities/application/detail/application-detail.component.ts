import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplication } from '../application.model';
import { ApplicationService } from '../service/application.service';
import { HttpResponse } from '@angular/common/http';
import { IToken } from '../../token/token.model';

@Component({
  selector: 'jhi-application-detail',
  templateUrl: './application-detail.component.html',
})
export class ApplicationDetailComponent implements OnInit {
  application: IApplication | null = null;
  token: IToken | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ application }) => {
      this.application = application;

      this.retrieveToken();
    });
  }

  previousState(): void {
    window.history.back();
  }

  regenerateToken(): void {
    if (this.application && this.application.id !== undefined) {
      this.applicationService.regenerateToken(this.application.id).subscribe((tokenHttpResponse: HttpResponse<IToken>) => {
        this.token = tokenHttpResponse.body;
      });
    } else {
      console.error('Application is not defined or has no ID.');
    }
  }

  retrieveToken(): void {
    if (this.application && this.application.id !== undefined) {
      this.applicationService.retrieveToken(this.application.id).subscribe((tokenHttpResponse: HttpResponse<IToken>) => {
        this.token = tokenHttpResponse.body;
      });
    } else {
      console.error('Application is not defined or has no ID.');
    }
  }
}
