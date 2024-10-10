import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirm_password');

  if (!password || !confirmPassword) {
    return null; // Return if the controls are not defined
  }

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ noMatch: true });
  } else {
    // Clear noMatch error if passwords match, while preserving other errors
    if (confirmPassword.hasError('noMatch')) {
      confirmPassword.setErrors(null);
    }
  }

  return null; // Always return null for group-level validation since errors are set directly on confirm_password
};
