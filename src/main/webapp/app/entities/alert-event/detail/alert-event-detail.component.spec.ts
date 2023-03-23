import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlertEventDetailComponent } from './alert-event-detail.component';

describe('AlertEvent Management Detail Component', () => {
  let comp: AlertEventDetailComponent;
  let fixture: ComponentFixture<AlertEventDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertEventDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ alertEvent: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AlertEventDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AlertEventDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alertEvent on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.alertEvent).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
