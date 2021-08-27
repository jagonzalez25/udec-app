import { Usuario } from './../../_model/Usuario';
import { PerfilService } from './../../_service/perfil.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
      let user = new Usuario();
      user.usuario = "tatan";
      this.perfilService.cargarUsuario(user).subscribe(data =>{
          console.log(data);
      }, err =>{
          console.log(err);
      });
  }

  cargarUsuario() {
    let user = new Usuario();
    user.usuario = "tatan";
    this.perfilService.cargarUsuario(user).subscribe(data =>{
        console.log(data);
    }, err =>{
        console.log(err);
    }); 
  }

}
