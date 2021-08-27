import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private url: string = `${environment.HOST}/perfil`;

  constructor(private http: HttpClient) { }

  cargarDatos() {
    return this.http.get<any[]>(`${this.url}/postCargarDatosPerfil`);
  }

  cargarUsuario(usuario: Usuario) {
    return this.http.post<any>(`${this.url}/postCargarDatosPerfil`, usuario);
  } 
}
