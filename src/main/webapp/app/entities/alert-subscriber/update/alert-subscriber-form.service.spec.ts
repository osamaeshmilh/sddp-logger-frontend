import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../alert-subscriber.test-samples';

import { AlertSubscriberFormService } from './alert-subscriber-form.service';

describe('AlertSubscriber Form Service', () => {
  let service: AlertSubscriberFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSubscriberFormService);
  });

  describe('Service methods', () => {
    describe('createAlertSubscriberFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlertSubscriberFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
            applications: expect.any(Object),
          })
        );
      });

      it('passing IAlertSubscriber should create a new form with FormGroup', () => {
        const formGroup = service.createAlertSubscriberFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
            applications: expect.any(Object),
          })
        );
      });
    });

    describe('getAlertSubscriber', () => {
      it('should return NewAlertSubscriber for default AlertSubscriber initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlertSubscriberFormGroup(sampleWithNewData);

        const alertSubscriber = service.getAlertSubscriber(formGroup) as any;

        expect(alertSubscriber).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlertSubscriber for empty AlertSubscriber initial value', () => {
        const formGroup = service.createAlertSubscriberFormGroup();

        const alertSubscriber = service.getAlertSubscriber(formGroup) as any;

        expect(alertSubscriber).toMatchObject({});
      });

      it('should return IAlertSubscriber', () => {
        const formGroup = service.createAlertSubscriberFormGroup(sampleWithRequiredData);

        const alertSubscriber = service.getAlertSubscriber(formGroup) as any;

        expect(alertSubscriber).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlertSubscriber should not enable id FormControl', () => {
        const formGroup = service.createAlertSubscriberFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlertSubscriber should disable id FormControl', () => {
        const formGroup = service.createAlertSubscriberFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
