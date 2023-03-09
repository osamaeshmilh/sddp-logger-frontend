import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TokenDetailComponent } from './token-detail.component';

describe('Token Management Detail Component', () => {
  let comp: TokenDetailComponent;
  let fixture: ComponentFixture<TokenDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ token: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TokenDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TokenDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load token on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.token).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
