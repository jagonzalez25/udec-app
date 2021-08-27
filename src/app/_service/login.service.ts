import { Usuario } from './../_model/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './../_model/Login';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/registroLogin`;

  public barraProgreso = new Subject<string>();


  constructor(private http: HttpClient,
              private router: Router) { }

  login(usuario: string, contrasena: string) {
      let login: Login;
      login = new Login();
      login.Usuario = usuario;
      login.Contrasena = contrasena;
      return this.http.post<string>(`${this.url}/postIngresoLogin`, login);
  }

  estaLogueado(): number {
    let token = sessionStorage.getItem(environment.TOKEN);
    if(token != null) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token); 
        if(isExpired == true) {
          return 2;
        } else {
          return 1;
        }
    } else {
      return 0;
    }
  }

  cerrarSesion(): void{
    //Borrar datos de login
    //Consumir servicio de cerrar sesion
   sessionStorage.removeItem(environment.TOKEN);
    //borrar del front y consumir servicio para destruirlo en el back
    this.router.navigate(['loginReal']);
  }

  registroUsurio(usuario: Usuario) {
    return this.http.post<string>(`${this.url}/postRegistroUsuario`, usuario);
  }

  
}
