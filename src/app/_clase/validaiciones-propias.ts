import { ValidationErrors, FormGroup, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
export class ValidaicionesPropias {

    static validarIncialTelefono(control: FormGroup): ValidationErrors  {
        let numero = control.value.substring(0, 1);
        if(numero === '3')
            return null;
        else {
            return { validarInicalTel: true };
        }    
    }

    static validarIgualdadContrasena(control: FormGroup) : ValidationErrors {
        console.log(control);
        let contrasena = control.get('contrasena').value;
        let contrasenaConf = control.get('contrasenaconf').value;
        if(contrasena !== contrasenaConf) {
            control.get('contrasenaconf').setErrors({ NoPassswordMatch: true });
        } else
            return null;
    }
 
}
