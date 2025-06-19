import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { passwordMismatch: true };
    };
}

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const errors: any = {};
    if (!/[A-Z]/.test(value)) errors.missingUppercase = true;
    if (!/[a-z]/.test(value)) errors.missingLowercase = true;
    if (!/[0-9]/.test(value)) errors.missingNumber = true;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.missingSpecialChar = true;

    return Object.keys(errors).length ? { strongPassword: errors } : null;
}

