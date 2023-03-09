import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IToken } from '../token.model';

@Component({
  selector: 'jhi-token-detail',
  templateUrl: './token-detail.component.html',
})
export class TokenDetailComponent implements OnInit {
  token: IToken | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ token }) => {
      this.token = token;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
