import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAlertEvent, NewAlertEvent } from '../alert-event.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlertEvent for edit and NewAlertEventFormGroupInput for create.
 */
type AlertEventFormGroupInput = IAlertEvent | PartialWithRequiredKeyOf<NewAlertEvent>;

type AlertEventFormDefaults = Pick<NewAlertEvent, 'id' | 'isSent'>;

type AlertEventFormGroupContent = {
  id: FormControl<IAlertEvent['id'] | NewAlertEvent['id']>;
  code: FormControl<IAlertEvent['code']>;
  applicationCode: FormControl<IAlertEvent['applicationCode']>;
  isSent: FormControl<IAlertEvent['isSent']>;
  alertSubscriber: FormControl<IAlertEvent['alertSubscriber']>;
};

export type AlertEventFormGroup = FormGroup<AlertEventFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlertEventFormService {
  createAlertEventFormGroup(alertEvent: AlertEventFormGroupInput = { id: null }): AlertEventFormGroup {
    const alertEventRawValue = {
      ...this.getFormDefaults(),
      ...alertEvent,
    };
    return new FormGroup<AlertEventFormGroupContent>({
      id: new FormControl(
        { value: alertEventRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(alertEventRawValue.code),
      applicationCode: new FormControl(alertEventRawValue.applicationCode),
      isSent: new FormControl(alertEventRawValue.isSent),
      alertSubscriber: new FormControl(alertEventRawValue.alertSubscriber, {
        validators: [Validators.required],
      }),
    });
  }

  getAlertEvent(form: AlertEventFormGroup): IAlertEvent | NewAlertEvent {
    return form.getRawValue() as IAlertEvent | NewAlertEvent;
  }

  resetForm(form: AlertEventFormGroup, alertEvent: AlertEventFormGroupInput): void {
    const alertEventRawValue = { ...this.getFormDefaults(), ...alertEvent };
    form.reset(
      {
        ...alertEventRawValue,
        id: { value: alertEventRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlertEventFormDefaults {
    return {
      id: null,
      isSent: false,
    };
  }
}
