import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmEqlPassValidator,
      multi: true,
    },
  ],
})
export class ConfirmEqlPassValidator implements Validator {
  // @Input() appConfirmPassValidator!: string;

  validate(passwordGroup: AbstractControl): ValidationErrors | null {
    const passwordField = passwordGroup.get('password');
    const confirmPasswordField = passwordGroup.get('confirmPassword');

    // console.log(passwordField?.value + ' ' + confirmPasswordField?.value);

    if (passwordField?.value !== confirmPasswordField?.value) {
      return { notEqual: true };
    }
    return null;
  }
}
