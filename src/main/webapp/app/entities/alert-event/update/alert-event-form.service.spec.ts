import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../alert-event.test-samples';

import { AlertEventFormService } from './alert-event-form.service';

describe('AlertEvent Form Service', () => {
  let service: AlertEventFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertEventFormService);
  });

  describe('Service methods', () => {
    describe('createAlertEventFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlertEventFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            application_code: expect.any(Object),
            is_sent: expect.any(Object),
            alertSubscriber: expect.any(Object),
          })
        );
      });

      it('passing IAlertEvent should create a new form with FormGroup', () => {
        const formGroup = service.createAlertEventFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            application_code: expect.any(Object),
            is_sent: expect.any(Object),
            alertSubscriber: expect.any(Object),
          })
        );
      });
    });

    describe('getAlertEvent', () => {
      it('should return NewAlertEvent for default AlertEvent initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlertEventFormGroup(sampleWithNewData);

        const alertEvent = service.getAlertEvent(formGroup) as any;

        expect(alertEvent).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlertEvent for empty AlertEvent initial value', () => {
        const formGroup = service.createAlertEventFormGroup();

        const alertEvent = service.getAlertEvent(formGroup) as any;

        expect(alertEvent).toMatchObject({});
      });

      it('should return IAlertEvent', () => {
        const formGroup = service.createAlertEventFormGroup(sampleWithRequiredData);

        const alertEvent = service.getAlertEvent(formGroup) as any;

        expect(alertEvent).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlertEvent should not enable id FormControl', () => {
        const formGroup = service.createAlertEventFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlertEvent should disable id FormControl', () => {
        const formGroup = service.createAlertEventFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
