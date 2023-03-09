import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HttpLogDetailComponent } from './http-log-detail.component';

describe('HttpLog Management Detail Component', () => {
  let comp: HttpLogDetailComponent;
  let fixture: ComponentFixture<HttpLogDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpLogDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ httpLog: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HttpLogDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HttpLogDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load httpLog on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.httpLog).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
