import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAlertSubscriber, NewAlertSubscriber } from '../alert-subscriber.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlertSubscriber for edit and NewAlertSubscriberFormGroupInput for create.
 */
type AlertSubscriberFormGroupInput = IAlertSubscriber | PartialWithRequiredKeyOf<NewAlertSubscriber>;

type AlertSubscriberFormDefaults = Pick<NewAlertSubscriber, 'id' | 'applications'>;

type AlertSubscriberFormGroupContent = {
  id: FormControl<IAlertSubscriber['id'] | NewAlertSubscriber['id']>;
  name: FormControl<IAlertSubscriber['name']>;
  email: FormControl<IAlertSubscriber['email']>;
  applications: FormControl<IAlertSubscriber['applications']>;
};

export type AlertSubscriberFormGroup = FormGroup<AlertSubscriberFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlertSubscriberFormService {
  createAlertSubscriberFormGroup(alertSubscriber: AlertSubscriberFormGroupInput = { id: null }): AlertSubscriberFormGroup {
    const alertSubscriberRawValue = {
      ...this.getFormDefaults(),
      ...alertSubscriber,
    };
    return new FormGroup<AlertSubscriberFormGroupContent>({
      id: new FormControl(
        { value: alertSubscriberRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(alertSubscriberRawValue.name, {
        validators: [Validators.required],
      }),
      email: new FormControl(alertSubscriberRawValue.email, {
        validators: [Validators.required],
      }),
      applications: new FormControl(alertSubscriberRawValue.applications ?? []),
    });
  }

  getAlertSubscriber(form: AlertSubscriberFormGroup): IAlertSubscriber | NewAlertSubscriber {
    return form.getRawValue() as IAlertSubscriber | NewAlertSubscriber;
  }

  resetForm(form: AlertSubscriberFormGroup, alertSubscriber: AlertSubscriberFormGroupInput): void {
    const alertSubscriberRawValue = { ...this.getFormDefaults(), ...alertSubscriber };
    form.reset(
      {
        ...alertSubscriberRawValue,
        id: { value: alertSubscriberRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlertSubscriberFormDefaults {
    return {
      id: null,
      applications: [],
    };
  }
}
