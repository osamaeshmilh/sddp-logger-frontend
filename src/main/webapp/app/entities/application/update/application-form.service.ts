import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IApplication, NewApplication } from '../application.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApplication for edit and NewApplicationFormGroupInput for create.
 */
type ApplicationFormGroupInput = IApplication | PartialWithRequiredKeyOf<NewApplication>;

type ApplicationFormDefaults = Pick<NewApplication, 'id' | 'alertSubscribers'>;

type ApplicationFormGroupContent = {
  id: FormControl<IApplication['id'] | NewApplication['id']>;
  name: FormControl<IApplication['name']>;
  code: FormControl<IApplication['code']>;
  alertResponseCodes: FormControl<IApplication['alertResponseCodes']>;
  organization: FormControl<IApplication['organization']>;
  alertSubscribers: FormControl<IApplication['alertSubscribers']>;
};

export type ApplicationFormGroup = FormGroup<ApplicationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApplicationFormService {
  createApplicationFormGroup(application: ApplicationFormGroupInput = { id: null }): ApplicationFormGroup {
    const applicationRawValue = {
      ...this.getFormDefaults(),
      ...application,
    };
    return new FormGroup<ApplicationFormGroupContent>({
      id: new FormControl(
        { value: applicationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(applicationRawValue.name, {
        validators: [Validators.required],
      }),
      code: new FormControl(applicationRawValue.code, {
        validators: [Validators.required],
      }),
      alertResponseCodes: new FormControl(applicationRawValue.alertResponseCodes),
      organization: new FormControl(applicationRawValue.organization, {
        validators: [Validators.required],
      }),
      alertSubscribers: new FormControl(applicationRawValue.alertSubscribers ?? []),
    });
  }

  getApplication(form: ApplicationFormGroup): IApplication | NewApplication {
    return form.getRawValue() as IApplication | NewApplication;
  }

  resetForm(form: ApplicationFormGroup, application: ApplicationFormGroupInput): void {
    const applicationRawValue = { ...this.getFormDefaults(), ...application };
    form.reset(
      {
        ...applicationRawValue,
        id: { value: applicationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApplicationFormDefaults {
    return {
      id: null,
      alertSubscribers: [],
    };
  }
}
