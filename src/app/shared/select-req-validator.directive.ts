import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appSelectValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SelectReqValidator,
      multi: true,
    },
  ],
})
export class SelectReqValidator implements Validator {
  //input property to receive the specified default option value
  @Input('appSelectValidator') defaultValue!: string;

  //implements validate method of the Validator interface
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value === this.defaultValue) {
      return { defaultSelected: true };
    } else return null;
  }
}
