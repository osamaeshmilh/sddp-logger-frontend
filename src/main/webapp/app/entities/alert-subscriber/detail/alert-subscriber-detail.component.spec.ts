import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlertSubscriberDetailComponent } from './alert-subscriber-detail.component';

describe('AlertSubscriber Management Detail Component', () => {
  let comp: AlertSubscriberDetailComponent;
  let fixture: ComponentFixture<AlertSubscriberDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertSubscriberDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ alertSubscriber: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AlertSubscriberDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AlertSubscriberDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alertSubscriber on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.alertSubscriber).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
