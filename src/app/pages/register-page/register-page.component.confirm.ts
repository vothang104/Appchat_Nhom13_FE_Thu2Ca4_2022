import { FormBuilder, FormGroup, Validators,AbstractControl,ValidatorFn,ValidationErrors} from '@angular/forms';
export function matchValidator(
    matchTo: string, 
    reverse?: boolean
  ): ValidatorFn {
    return (control: AbstractControl): 
    ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === 
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
  registerForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    passWord: ['', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25),
      matchValidator('confirmPassword', true)
    ]],
    confirmPassword: ['', [
      Validators.required,
      matchValidator('password')
    ]],
  });