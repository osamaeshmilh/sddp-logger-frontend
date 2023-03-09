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

type TokenFormDefaults = Pick<NewToken, 'id' | 'isActive'>;

type TokenFormGroupContent = {
  id: FormControl<IToken['id'] | NewToken['id']>;
  accessToken: FormControl<IToken['accessToken']>;
  refreshToken: FormControl<IToken['refreshToken']>;
  expiryDate: FormControl<IToken['expiryDate']>;
  isActive: FormControl<IToken['isActive']>;
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
      accessToken: new FormControl(tokenRawValue.accessToken, {
        validators: [Validators.required],
      }),
      refreshToken: new FormControl(tokenRawValue.refreshToken),
      expiryDate: new FormControl(tokenRawValue.expiryDate),
      isActive: new FormControl(tokenRawValue.isActive, {
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
      isActive: false,
    };
  }
}
