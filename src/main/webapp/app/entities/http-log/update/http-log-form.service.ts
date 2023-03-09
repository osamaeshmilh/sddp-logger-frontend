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
type FormValueOf<T extends IHttpLog | NewHttpLog> = Omit<T, 'requestTimestamp'> & {
  requestTimestamp?: string | null;
};

type HttpLogFormRawValue = FormValueOf<IHttpLog>;

type NewHttpLogFormRawValue = FormValueOf<NewHttpLog>;

type HttpLogFormDefaults = Pick<NewHttpLog, 'id' | 'requestTimestamp'>;

type HttpLogFormGroupContent = {
  id: FormControl<HttpLogFormRawValue['id'] | NewHttpLog['id']>;
  requestTimestamp: FormControl<HttpLogFormRawValue['requestTimestamp']>;
  httpMethod: FormControl<HttpLogFormRawValue['httpMethod']>;
  requestUrl: FormControl<HttpLogFormRawValue['requestUrl']>;
  httpStatusCode: FormControl<HttpLogFormRawValue['httpStatusCode']>;
  remoteIPAddress: FormControl<HttpLogFormRawValue['remoteIPAddress']>;
  duration: FormControl<HttpLogFormRawValue['duration']>;
  requestHeaders: FormControl<HttpLogFormRawValue['requestHeaders']>;
  responseHeaders: FormControl<HttpLogFormRawValue['responseHeaders']>;
  requestURLParameters: FormControl<HttpLogFormRawValue['requestURLParameters']>;
  requestBody: FormControl<HttpLogFormRawValue['requestBody']>;
  requestCookies: FormControl<HttpLogFormRawValue['requestCookies']>;
  responseCookies: FormControl<HttpLogFormRawValue['responseCookies']>;
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
      requestTimestamp: new FormControl(httpLogRawValue.requestTimestamp, {
        validators: [Validators.required],
      }),
      httpMethod: new FormControl(httpLogRawValue.httpMethod, {
        validators: [Validators.required],
      }),
      requestUrl: new FormControl(httpLogRawValue.requestUrl, {
        validators: [Validators.required],
      }),
      httpStatusCode: new FormControl(httpLogRawValue.httpStatusCode, {
        validators: [Validators.required],
      }),
      remoteIPAddress: new FormControl(httpLogRawValue.remoteIPAddress, {
        validators: [Validators.required],
      }),
      duration: new FormControl(httpLogRawValue.duration, {
        validators: [Validators.required],
      }),
      requestHeaders: new FormControl(httpLogRawValue.requestHeaders, {
        validators: [Validators.required],
      }),
      responseHeaders: new FormControl(httpLogRawValue.responseHeaders, {
        validators: [Validators.required],
      }),
      requestURLParameters: new FormControl(httpLogRawValue.requestURLParameters),
      requestBody: new FormControl(httpLogRawValue.requestBody),
      requestCookies: new FormControl(httpLogRawValue.requestCookies),
      responseCookies: new FormControl(httpLogRawValue.responseCookies),
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
      requestTimestamp: currentTime,
    };
  }

  private convertHttpLogRawValueToHttpLog(rawHttpLog: HttpLogFormRawValue | NewHttpLogFormRawValue): IHttpLog | NewHttpLog {
    return {
      ...rawHttpLog,
      requestTimestamp: dayjs(rawHttpLog.requestTimestamp, DATE_TIME_FORMAT),
    };
  }

  private convertHttpLogToHttpLogRawValue(
    httpLog: IHttpLog | (Partial<NewHttpLog> & HttpLogFormDefaults)
  ): HttpLogFormRawValue | PartialWithRequiredKeyOf<NewHttpLogFormRawValue> {
    return {
      ...httpLog,
      requestTimestamp: httpLog.requestTimestamp ? httpLog.requestTimestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
