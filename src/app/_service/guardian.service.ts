import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let respuesta = this.loginService.estaLogueado();
    let intentos = 0;
    if(respuesta == 1 || respuesta == 2) {
      if(respuesta == 2) {
        this.loginService.barraProgreso.next("1");
        this.reLogin();
        while(true) {
            await this.delay(1500);
            respuesta = this.loginService.estaLogueado();
            if(respuesta == 1) {
              this.loginService.barraProgreso.next("2");
              break;
            }
            intentos++;
            if(intentos == 3) {
              this.loginService.barraProgreso.next("2");
              this.loginService.cerrarSesion();
              return false;
            }
        } 
      }

      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let rol = decodedToken.role;

      let url = state.url;
      if(url.includes('/buscar') && rol == 1)
          return true;
      else if(url.includes('/profesor') && rol == 1)
          return true;
      else if(url.includes('/estudiante') && rol == 2)
          return true;
      else if(url.includes('/consulta') && rol == 2)
          return true;
      else {
          this.router.navigate(['401Invalid']);
      }

    } else {
      this.router.navigate(['loginReal']);
    }
    return false;
  }

  private reLogin(): void {
    this.loginService.login("tatan", "12345").subscribe(data =>{
        sessionStorage.setItem(environment.TOKEN, data);
    });
  }

  private delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }


}
