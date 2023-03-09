import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of, Subject } from 'rxjs';

import { TokenFormService } from './token-form.service';
import { TokenService } from '../service/token.service';
import { IToken } from '../token.model';
import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';

import { TokenUpdateComponent } from './token-update.component';

describe('Token Management Update Component', () => {
  let comp: TokenUpdateComponent;
  let fixture: ComponentFixture<TokenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tokenFormService: TokenFormService;
  let tokenService: TokenService;
  let applicationService: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TokenUpdateComponent],
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
      .overrideTemplate(TokenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TokenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tokenFormService = TestBed.inject(TokenFormService);
    tokenService = TestBed.inject(TokenService);
    applicationService = TestBed.inject(ApplicationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Application query and add missing value', () => {
      const token: IToken = { id: 456 };
      const application: IApplication = { id: 76215 };
      token.application = application;

      const applicationCollection: IApplication[] = [{ id: 22610 }];
      jest.spyOn(applicationService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationCollection })));
      const additionalApplications = [application];
      const expectedCollection: IApplication[] = [...additionalApplications, ...applicationCollection];
      jest.spyOn(applicationService, 'addApplicationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ token });
      comp.ngOnInit();

      expect(applicationService.query).toHaveBeenCalled();
      expect(applicationService.addApplicationToCollectionIfMissing).toHaveBeenCalledWith(
        applicationCollection,
        ...additionalApplications.map(expect.objectContaining)
      );
      expect(comp.applicationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const token: IToken = { id: 456 };
      const application: IApplication = { id: 63634 };
      token.application = application;

      activatedRoute.data = of({ token });
      comp.ngOnInit();

      expect(comp.applicationsSharedCollection).toContain(application);
      expect(comp.token).toEqual(token);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IToken>>();
      const token = { id: 123 };
      jest.spyOn(tokenFormService, 'getToken').mockReturnValue(token);
      jest.spyOn(tokenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ token });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: token }));
      saveSubject.complete();

      // THEN
      expect(tokenFormService.getToken).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tokenService.update).toHaveBeenCalledWith(expect.objectContaining(token));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IToken>>();
      const token = { id: 123 };
      jest.spyOn(tokenFormService, 'getToken').mockReturnValue({ id: null });
      jest.spyOn(tokenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ token: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: token }));
      saveSubject.complete();

      // THEN
      expect(tokenFormService.getToken).toHaveBeenCalled();
      expect(tokenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IToken>>();
      const token = { id: 123 };
      jest.spyOn(tokenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ token });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tokenService.update).toHaveBeenCalled();
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
