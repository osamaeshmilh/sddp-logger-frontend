import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of, Subject } from 'rxjs';

import { HttpLogFormService } from './http-log-form.service';
import { HttpLogService } from '../service/http-log.service';
import { IHttpLog } from '../http-log.model';
import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';

import { HttpLogUpdateComponent } from './http-log-update.component';

describe('HttpLog Management Update Component', () => {
  let comp: HttpLogUpdateComponent;
  let fixture: ComponentFixture<HttpLogUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let httpLogFormService: HttpLogFormService;
  let httpLogService: HttpLogService;
  let applicationService: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HttpLogUpdateComponent],
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
      .overrideTemplate(HttpLogUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HttpLogUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpLogFormService = TestBed.inject(HttpLogFormService);
    httpLogService = TestBed.inject(HttpLogService);
    applicationService = TestBed.inject(ApplicationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Application query and add missing value', () => {
      const httpLog: IHttpLog = { id: 456 };
      const application: IApplication = { id: 29343 };
      httpLog.application = application;

      const applicationCollection: IApplication[] = [{ id: 68295 }];
      jest.spyOn(applicationService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationCollection })));
      const additionalApplications = [application];
      const expectedCollection: IApplication[] = [...additionalApplications, ...applicationCollection];
      jest.spyOn(applicationService, 'addApplicationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ httpLog });
      comp.ngOnInit();

      expect(applicationService.query).toHaveBeenCalled();
      expect(applicationService.addApplicationToCollectionIfMissing).toHaveBeenCalledWith(
        applicationCollection,
        ...additionalApplications.map(expect.objectContaining)
      );
      expect(comp.applicationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const httpLog: IHttpLog = { id: 456 };
      const application: IApplication = { id: 12276 };
      httpLog.application = application;

      activatedRoute.data = of({ httpLog });
      comp.ngOnInit();

      expect(comp.applicationsSharedCollection).toContain(application);
      expect(comp.httpLog).toEqual(httpLog);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHttpLog>>();
      const httpLog = { id: 123 };
      jest.spyOn(httpLogFormService, 'getHttpLog').mockReturnValue(httpLog);
      jest.spyOn(httpLogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ httpLog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: httpLog }));
      saveSubject.complete();

      // THEN
      expect(httpLogFormService.getHttpLog).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(httpLogService.update).toHaveBeenCalledWith(expect.objectContaining(httpLog));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHttpLog>>();
      const httpLog = { id: 123 };
      jest.spyOn(httpLogFormService, 'getHttpLog').mockReturnValue({ id: null });
      jest.spyOn(httpLogService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ httpLog: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: httpLog }));
      saveSubject.complete();

      // THEN
      expect(httpLogFormService.getHttpLog).toHaveBeenCalled();
      expect(httpLogService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHttpLog>>();
      const httpLog = { id: 123 };
      jest.spyOn(httpLogService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ httpLog });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(httpLogService.update).toHaveBeenCalled();
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
