import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../token.test-samples';

import { TokenFormService } from './token-form.service';

describe('Token Form Service', () => {
  let service: TokenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenFormService);
  });

  describe('Service methods', () => {
    describe('createTokenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTokenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            access_token: expect.any(Object),
            refresh_token: expect.any(Object),
            expiry_date: expect.any(Object),
            is_active: expect.any(Object),
            application: expect.any(Object),
          })
        );
      });

      it('passing IToken should create a new form with FormGroup', () => {
        const formGroup = service.createTokenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            access_token: expect.any(Object),
            refresh_token: expect.any(Object),
            expiry_date: expect.any(Object),
            is_active: expect.any(Object),
            application: expect.any(Object),
          })
        );
      });
    });

    describe('getToken', () => {
      it('should return NewToken for default Token initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTokenFormGroup(sampleWithNewData);

        const token = service.getToken(formGroup) as any;

        expect(token).toMatchObject(sampleWithNewData);
      });

      it('should return NewToken for empty Token initial value', () => {
        const formGroup = service.createTokenFormGroup();

        const token = service.getToken(formGroup) as any;

        expect(token).toMatchObject({});
      });

      it('should return IToken', () => {
        const formGroup = service.createTokenFormGroup(sampleWithRequiredData);

        const token = service.getToken(formGroup) as any;

        expect(token).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IToken should not enable id FormControl', () => {
        const formGroup = service.createTokenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewToken should disable id FormControl', () => {
        const formGroup = service.createTokenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
