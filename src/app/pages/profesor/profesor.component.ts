import { ProfesorEliminarComponent } from './profesor-eliminar/profesor-eliminar.component';
import { ListasService } from './../../_service/listas.service';
import { Muniicipio } from './../../_model/Municipio';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './../../_service/login.service';
import { PerfilService } from './../../_service/perfil.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  displayedColumns: string[] = ['idmunicipio', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<Muniicipio>();

  constructor(private perfilService: PerfilService,
              private loginService: LoginService,
              public route: ActivatedRoute,
              private listasService: ListasService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
      this.listasService.listarMunicipio().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
      });    
  }

  abrirDialogo(idMunicipio: number, nombre: string) {
    const dialogRef = this.dialog.open(ProfesorEliminarComponent, {
      width: '300px',
      data: {idMunicipio: idMunicipio, nombre: nombre}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result.opcion == "Aceptar") {
          console.log("Se llama el service de eliminar " + idMunicipio);
        }
    });

  }
  

}
