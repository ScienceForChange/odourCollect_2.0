import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * Validador personalizado para confirmar que dos campos de contraseñas coinciden.
 */
export class ConfirmPasswordValidator {
  /**
   * Crea un validador que compara dos campos de contraseñas y valida si coinciden.
   * @param password El nombre del campo de contraseña.
   * @param password_confirmation El nombre del campo de confirmación de contraseña.
   * @returns Devuelve "mismatch" si las contraseñas no coinciden.
   */
  static MatchValidator(password: string, password_confirmation: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const sourceCtrl = control.get(password);
      const targetCtrl = control.get(password_confirmation);
      const passwordInvalid = sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value;
      // Obtener los errores actuales del campo password_confirmation
      let currentErrors = { ...targetCtrl?.errors };

      if(passwordInvalid){
        // Agregar error 'noMatch' si la contraseña no coincide
        currentErrors['noMatch'] = true;
        // Actualizar errores
        targetCtrl.setErrors({...currentErrors});
        targetCtrl.markAsTouched();
        // Devolver un objeto de error para indicar una falta de coincidencia
        return { mismatch: true } 
      }
      else{
        // Eliminar 'noMacth' de los errores del campo password_confirmation
        delete currentErrors['noMatch'];
        // Actualizar errores
        Object.keys(currentErrors).length
          ? targetCtrl?.setErrors({...currentErrors}) 
          : targetCtrl?.setErrors(null);
      }

      return null
    };
  }
}