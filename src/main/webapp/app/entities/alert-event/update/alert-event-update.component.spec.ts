import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of, Subject } from 'rxjs';

import { AlertEventFormService } from './alert-event-form.service';
import { AlertEventService } from '../service/alert-event.service';
import { IAlertEvent } from '../alert-event.model';
import { IAlertSubscriber } from 'app/entities/alert-subscriber/alert-subscriber.model';
import { alert_subscriberservice } from 'app/entities/alert-subscriber/service/alert-subscriber.service';

import { AlertEventUpdateComponent } from './alert-event-update.component';

describe('AlertEvent Management Update Component', () => {
  let comp: AlertEventUpdateComponent;
  let fixture: ComponentFixture<AlertEventUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alertEventFormService: AlertEventFormService;
  let alertEventService: AlertEventService;
  let alert_subscriberservice: alert_subscriberservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlertEventUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AlertEventUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlertEventUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alertEventFormService = TestBed.inject(AlertEventFormService);
    alertEventService = TestBed.inject(AlertEventService);
    alert_subscriberservice = TestBed.inject(alert_subscriberservice);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AlertSubscriber query and add missing value', () => {
      const alertEvent: IAlertEvent = { id: 456 };
      const alertSubscriber: IAlertSubscriber = { id: 87138 };
      alertEvent.alertSubscriber = alertSubscriber;

      const alertSubscriberCollection: IAlertSubscriber[] = [{ id: 14423 }];
      jest.spyOn(alert_subscriberservice, 'query').mockReturnValue(of(new HttpResponse({ body: alertSubscriberCollection })));
      const additionalalert_subscribers = [alertSubscriber];
      const expectedCollection: IAlertSubscriber[] = [...additionalalert_subscribers, ...alertSubscriberCollection];
      jest.spyOn(alert_subscriberservice, 'addAlertSubscriberToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alertEvent });
      comp.ngOnInit();

      expect(alert_subscriberservice.query).toHaveBeenCalled();
      expect(alert_subscriberservice.addAlertSubscriberToCollectionIfMissing).toHaveBeenCalledWith(
        alertSubscriberCollection,
        ...additionalalert_subscribers.map(expect.objectContaining)
      );
      expect(comp.alert_subscribersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alertEvent: IAlertEvent = { id: 456 };
      const alertSubscriber: IAlertSubscriber = { id: 29691 };
      alertEvent.alertSubscriber = alertSubscriber;

      activatedRoute.data = of({ alertEvent });
      comp.ngOnInit();

      expect(comp.alert_subscribersSharedCollection).toContain(alertSubscriber);
      expect(comp.alertEvent).toEqual(alertEvent);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlertEvent>>();
      const alertEvent = { id: 123 };
      jest.spyOn(alertEventFormService, 'getAlertEvent').mockReturnValue(alertEvent);
      jest.spyOn(alertEventService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alertEvent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alertEvent }));
      saveSubject.complete();

      // THEN
      expect(alertEventFormService.getAlertEvent).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(alertEventService.update).toHaveBeenCalledWith(expect.objectContaining(alertEvent));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlertEvent>>();
      const alertEvent = { id: 123 };
      jest.spyOn(alertEventFormService, 'getAlertEvent').mockReturnValue({ id: null });
      jest.spyOn(alertEventService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alertEvent: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alertEvent }));
      saveSubject.complete();

      // THEN
      expect(alertEventFormService.getAlertEvent).toHaveBeenCalled();
      expect(alertEventService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlertEvent>>();
      const alertEvent = { id: 123 };
      jest.spyOn(alertEventService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alertEvent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alertEventService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAlertSubscriber', () => {
      it('Should forward to alert_subscriberservice', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(alert_subscriberservice, 'compareAlertSubscriber');
        comp.compareAlertSubscriber(entity, entity2);
        expect(alert_subscriberservice.compareAlertSubscriber).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
