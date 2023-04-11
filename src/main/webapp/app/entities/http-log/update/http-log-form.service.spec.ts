import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../http-log.test-samples';

import { HttpLogFormService } from './http-log-form.service';

describe('HttpLog Form Service', () => {
  let service: HttpLogFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLogFormService);
  });

  describe('Service methods', () => {
    describe('createHttpLogFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHttpLogFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            request_timestamp: expect.any(Object),
            http_method: expect.any(Object),
            request_url: expect.any(Object),
            http_status_code: expect.any(Object),
            remote_ip_address: expect.any(Object),
            duration: expect.any(Object),
            request_headers: expect.any(Object),
            response_headers: expect.any(Object),
            request_url_parameters: expect.any(Object),
            request_body: expect.any(Object),
            request_cookies: expect.any(Object),
            response_cookies: expect.any(Object),
            application: expect.any(Object),
          })
        );
      });

      it('passing IHttpLog should create a new form with FormGroup', () => {
        const formGroup = service.createHttpLogFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            request_timestamp: expect.any(Object),
            http_method: expect.any(Object),
            request_url: expect.any(Object),
            http_status_code: expect.any(Object),
            remote_ip_address: expect.any(Object),
            duration: expect.any(Object),
            request_headers: expect.any(Object),
            response_headers: expect.any(Object),
            request_url_parameters: expect.any(Object),
            request_body: expect.any(Object),
            request_cookies: expect.any(Object),
            response_cookies: expect.any(Object),
            application: expect.any(Object),
          })
        );
      });
    });

    describe('getHttpLog', () => {
      it('should return NewHttpLog for default HttpLog initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHttpLogFormGroup(sampleWithNewData);

        const httpLog = service.getHttpLog(formGroup) as any;

        expect(httpLog).toMatchObject(sampleWithNewData);
      });

      it('should return NewHttpLog for empty HttpLog initial value', () => {
        const formGroup = service.createHttpLogFormGroup();

        const httpLog = service.getHttpLog(formGroup) as any;

        expect(httpLog).toMatchObject({});
      });

      it('should return IHttpLog', () => {
        const formGroup = service.createHttpLogFormGroup(sampleWithRequiredData);

        const httpLog = service.getHttpLog(formGroup) as any;

        expect(httpLog).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHttpLog should not enable id FormControl', () => {
        const formGroup = service.createHttpLogFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHttpLog should disable id FormControl', () => {
        const formGroup = service.createHttpLogFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
