import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const rangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (control.value !== null
    && (isNaN(control.value) ||
      control.value < 1 ||
      control.value > 5)) {

    return {'range': true}
  }

  return null;
};


export function rangeValidatorWithParameter(min: number, max: number): ValidatorFn | null {

  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value !== null
      && (isNaN(control.value) ||
        control.value < min ||
        control.value > max)) {

      return {'range': true}
    }
  }

}
