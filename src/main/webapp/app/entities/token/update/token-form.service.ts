import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IToken, NewToken } from '../token.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IToken for edit and NewTokenFormGroupInput for create.
 */
type TokenFormGroupInput = IToken | PartialWithRequiredKeyOf<NewToken>;

type TokenFormDefaults = Pick<NewToken, 'id' | 'is_active'>;

type TokenFormGroupContent = {
  id: FormControl<IToken['id'] | NewToken['id']>;
  access_token: FormControl<IToken['access_token']>;
  refresh_token: FormControl<IToken['refresh_token']>;
  expiry_date: FormControl<IToken['expiry_date']>;
  is_active: FormControl<IToken['is_active']>;
  application: FormControl<IToken['application']>;
};

export type TokenFormGroup = FormGroup<TokenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TokenFormService {
  createTokenFormGroup(token: TokenFormGroupInput = { id: null }): TokenFormGroup {
    const tokenRawValue = {
      ...this.getFormDefaults(),
      ...token,
    };
    return new FormGroup<TokenFormGroupContent>({
      id: new FormControl(
        { value: tokenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      access_token: new FormControl(tokenRawValue.access_token, {
        validators: [Validators.required],
      }),
      refresh_token: new FormControl(tokenRawValue.refresh_token),
      expiry_date: new FormControl(tokenRawValue.expiry_date),
      is_active: new FormControl(tokenRawValue.is_active, {
        validators: [Validators.required],
      }),
      application: new FormControl(tokenRawValue.application, {
        validators: [Validators.required],
      }),
    });
  }

  getToken(form: TokenFormGroup): IToken | NewToken {
    return form.getRawValue() as IToken | NewToken;
  }

  resetForm(form: TokenFormGroup, token: TokenFormGroupInput): void {
    const tokenRawValue = { ...this.getFormDefaults(), ...token };
    form.reset(
      {
        ...tokenRawValue,
        id: { value: tokenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TokenFormDefaults {
    return {
      id: null,
      is_active: false,
    };
  }
}
