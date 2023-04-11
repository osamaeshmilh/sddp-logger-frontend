import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of, Subject } from 'rxjs';

import { AlertSubscriberFormService } from './alert-subscriber-form.service';
import { alert_subscriberservice } from '../service/alert-subscriber.service';
import { IAlertSubscriber } from '../alert-subscriber.model';
import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';

import { AlertSubscriberUpdateComponent } from './alert-subscriber-update.component';

describe('AlertSubscriber Management Update Component', () => {
  let comp: AlertSubscriberUpdateComponent;
  let fixture: ComponentFixture<AlertSubscriberUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alertSubscriberFormService: AlertSubscriberFormService;
  let alert_subscriberservice: alert_subscriberservice;
  let applicationService: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlertSubscriberUpdateComponent],
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
      .overrideTemplate(AlertSubscriberUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlertSubscriberUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alertSubscriberFormService = TestBed.inject(AlertSubscriberFormService);
    alert_subscriberservice = TestBed.inject(alert_subscriberservice);
    applicationService = TestBed.inject(ApplicationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Application query and add missing value', () => {
      const alertSubscriber: IAlertSubscriber = { id: 456 };
      const applications: IApplication[] = [{ id: 3547 }];
      alertSubscriber.applications = applications;

      const applicationCollection: IApplication[] = [{ id: 99154 }];
      jest.spyOn(applicationService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationCollection })));
      const additionalApplications = [...applications];
      const expectedCollection: IApplication[] = [...additionalApplications, ...applicationCollection];
      jest.spyOn(applicationService, 'addApplicationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alertSubscriber });
      comp.ngOnInit();

      expect(applicationService.query).toHaveBeenCalled();
      expect(applicationService.addApplicationToCollectionIfMissing).toHaveBeenCalledWith(
        applicationCollection,
        ...additionalApplications.map(expect.objectContaining)
      );
      expect(comp.applicationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alertSubscriber: IAlertSubscriber = { id: 456 };
      const application: IApplication = { id: 16915 };
      alertSubscriber.applications = [application];

      activatedRoute.data = of({ alertSubscriber });
      comp.ngOnInit();

      expect(comp.applicationsSharedCollection).toContain(application);
      expect(comp.alertSubscriber).toEqual(alertSubscriber);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlertSubscriber>>();
      const alertSubscriber = { id: 123 };
      jest.spyOn(alertSubscriberFormService, 'getAlertSubscriber').mockReturnValue(alertSubscriber);
      jest.spyOn(alert_subscriberservice, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alertSubscriber });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alertSubscriber }));
      saveSubject.complete();

      // THEN
      expect(alertSubscriberFormService.getAlertSubscriber).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(alert_subscriberservice.update).toHaveBeenCalledWith(expect.objectContaining(alertSubscriber));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlertSubscriber>>();
      const alertSubscriber = { id: 123 };
      jest.spyOn(alertSubscriberFormService, 'getAlertSubscriber').mockReturnValue({ id: null });
      jest.spyOn(alert_subscriberservice, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alertSubscriber: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alertSubscriber }));
      saveSubject.complete();

      // THEN
      expect(alertSubscriberFormService.getAlertSubscriber).toHaveBeenCalled();
      expect(alert_subscriberservice.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlertSubscriber>>();
      const alertSubscriber = { id: 123 };
      jest.spyOn(alert_subscriberservice, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alertSubscriber });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alert_subscriberservice.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareApplication', () => {
      it('Should forward to applicationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(applicationService, 'compareApplication');
        comp.compareApplication(entity, entity2);
        expect(applicationService.compareApplication).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
