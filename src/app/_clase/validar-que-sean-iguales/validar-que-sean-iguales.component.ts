import { FormControl, ValidationErrors } from '@angular/forms';

export class ValidarQueSeanIgualesComponent  {

  static contrasenaIgual(control: FormControl): ValidationErrors {
    let password = control.parent.controls["contrasena"];
    let confirmarPassword = control.parent.controls["contrasenaconf"];
    if (password  === confirmarPassword)
        return null;
    else
        return { noSonIguales: true }
  }

}
