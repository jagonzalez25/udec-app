import { Muniicipio } from './../_model/Municipio';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private url: string = `${environment.HOST}/listas`;


  
  constructor(private http: HttpClient) { }

  listarMunicipio() {
    return this.http.get<Muniicipio[]>(`${this.url}/getListasMunicipios`);
  }
}
