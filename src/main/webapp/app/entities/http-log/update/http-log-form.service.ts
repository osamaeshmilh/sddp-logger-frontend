import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHttpLog, NewHttpLog } from '../http-log.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHttpLog for edit and NewHttpLogFormGroupInput for create.
 */
type HttpLogFormGroupInput = IHttpLog | PartialWithRequiredKeyOf<NewHttpLog>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IHttpLog | NewHttpLog> = Omit<T, 'request_timestamp'> & {
  request_timestamp?: string | null;
};

type HttpLogFormRawValue = FormValueOf<IHttpLog>;

type NewHttpLogFormRawValue = FormValueOf<NewHttpLog>;

type HttpLogFormDefaults = Pick<NewHttpLog, 'id' | 'request_timestamp'>;

type HttpLogFormGroupContent = {
  id: FormControl<HttpLogFormRawValue['id'] | NewHttpLog['id']>;
  request_timestamp: FormControl<HttpLogFormRawValue['request_timestamp']>;
  http_method: FormControl<HttpLogFormRawValue['http_method']>;
  request_url: FormControl<HttpLogFormRawValue['request_url']>;
  http_status_code: FormControl<HttpLogFormRawValue['http_status_code']>;
  remote_ip_address: FormControl<HttpLogFormRawValue['remote_ip_address']>;
  duration: FormControl<HttpLogFormRawValue['duration']>;
  request_headers: FormControl<HttpLogFormRawValue['request_headers']>;
  response_headers: FormControl<HttpLogFormRawValue['response_headers']>;
  request_url_parameters: FormControl<HttpLogFormRawValue['request_url_parameters']>;
  request_body: FormControl<HttpLogFormRawValue['request_body']>;
  request_cookies: FormControl<HttpLogFormRawValue['request_cookies']>;
  response_cookies: FormControl<HttpLogFormRawValue['response_cookies']>;
  application: FormControl<HttpLogFormRawValue['application']>;
};

export type HttpLogFormGroup = FormGroup<HttpLogFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HttpLogFormService {
  createHttpLogFormGroup(httpLog: HttpLogFormGroupInput = { id: null }): HttpLogFormGroup {
    const httpLogRawValue = this.convertHttpLogToHttpLogRawValue({
      ...this.getFormDefaults(),
      ...httpLog,
    });
    return new FormGroup<HttpLogFormGroupContent>({
      id: new FormControl(
        { value: httpLogRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      request_timestamp: new FormControl(httpLogRawValue.request_timestamp, {
        validators: [Validators.required],
      }),
      http_method: new FormControl(httpLogRawValue.http_method, {
        validators: [Validators.required],
      }),
      request_url: new FormControl(httpLogRawValue.request_url, {
        validators: [Validators.required],
      }),
      http_status_code: new FormControl(httpLogRawValue.http_status_code, {
        validators: [Validators.required],
      }),
      remote_ip_address: new FormControl(httpLogRawValue.remote_ip_address, {
        validators: [Validators.required],
      }),
      duration: new FormControl(httpLogRawValue.duration, {
        validators: [Validators.required],
      }),
      request_headers: new FormControl(httpLogRawValue.request_headers, {
        validators: [Validators.required],
      }),
      response_headers: new FormControl(httpLogRawValue.response_headers, {
        validators: [Validators.required],
      }),
      request_url_parameters: new FormControl(httpLogRawValue.request_url_parameters),
      request_body: new FormControl(httpLogRawValue.request_body),
      request_cookies: new FormControl(httpLogRawValue.request_cookies),
      response_cookies: new FormControl(httpLogRawValue.response_cookies),
      application: new FormControl(httpLogRawValue.application, {
        validators: [Validators.required],
      }),
    });
  }

  getHttpLog(form: HttpLogFormGroup): IHttpLog | NewHttpLog {
    return this.convertHttpLogRawValueToHttpLog(form.getRawValue() as HttpLogFormRawValue | NewHttpLogFormRawValue);
  }

  resetForm(form: HttpLogFormGroup, httpLog: HttpLogFormGroupInput): void {
    const httpLogRawValue = this.convertHttpLogToHttpLogRawValue({ ...this.getFormDefaults(), ...httpLog });
    form.reset(
      {
        ...httpLogRawValue,
        id: { value: httpLogRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HttpLogFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      request_timestamp: currentTime,
    };
  }

  private convertHttpLogRawValueToHttpLog(rawHttpLog: HttpLogFormRawValue | NewHttpLogFormRawValue): IHttpLog | NewHttpLog {
    return {
      ...rawHttpLog,
      request_timestamp: dayjs(rawHttpLog.request_timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertHttpLogToHttpLogRawValue(
    httpLog: IHttpLog | (Partial<NewHttpLog> & HttpLogFormDefaults)
  ): HttpLogFormRawValue | PartialWithRequiredKeyOf<NewHttpLogFormRawValue> {
    return {
      ...httpLog,
      request_timestamp: httpLog.request_timestamp ? httpLog.request_timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
