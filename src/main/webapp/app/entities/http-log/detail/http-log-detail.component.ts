import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHttpLog } from '../http-log.model';

@Component({
  selector: 'jhi-http-log-detail',
  templateUrl: './http-log-detail.component.html',
})
export class HttpLogDetailComponent implements OnInit {
  httpLog: IHttpLog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ httpLog }) => {
      this.httpLog = httpLog;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
