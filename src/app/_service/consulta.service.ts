import { Consulta } from './../_model/Consulta';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  //url: string = environment.HOST + '/consultas/';

  private url: string = `${environment.HOST}/consultas`;

  constructor(private http: HttpClient) { }

  //Genera una peticion asincrona NO SINCRONA
  retorar() {
    return this.http.get<Consulta[]>(`${this.url}/retornar`);
  }

  retorarPorId(id: number) {
    return this.http.get<Consulta[]>(`${this.url}/retornarPorId/${id}`);
  }

}
