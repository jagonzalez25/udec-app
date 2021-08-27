import { LoginService } from './login.service';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInteceptorService implements HttpInterceptor{

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
    return next.handle(req).pipe(retry(environment.REINTENTOS)).
    pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage) {
          throw new Error(event.body.errorMessage);
        }/*else{
           Entra al else si en los intentos el servicio Funciona   
        }*/
      }
    })).pipe(catchError((err) => {
        console.log("Entro por interceptor: ");
        console.log(err);
        this.loginService.barraProgreso.next("2");

        if(err.status == 400 && err.error.message === "Usuario o contraseña incorrecto") {
          this.snackBar.open('Usuario y/o cotraseña inconrrecta', 'Advertrencia', {
            duration: 2000,
          });
        }  else if(err.status == 401) {
           this.router.navigate([`/401Invalid`]);
        }  else if(err.status == 404) {
            this.router.navigate([`/error/${err.status}/Recurso no encontrado`]);
        } else if(err.status == 500) {
            this.router.navigate([`/error/${err.status}/Eror en servidor`]);
        } else {
            this.router.navigate([`/error/${err.status}/Erorr Inesperado`]);
        }

        return EMPTY;
    }));
  }

}
