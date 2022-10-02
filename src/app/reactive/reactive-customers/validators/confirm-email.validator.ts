import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const confirmEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const emailControl = control.get('email');
  const confirmEmailControl = control.get('confirmEmail');

  if(emailControl.pristine || confirmEmailControl.pristine){
    return null;
  }

  if (emailControl.value === confirmEmailControl.value) {
    return null;
  }

  return {'match' : true};
};
