import { Muniicipio } from './../../../_model/Municipio';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profesor-eliminar',
  templateUrl: './profesor-eliminar.component.html',
  styleUrls: ['./profesor-eliminar.component.css']
})
export class ProfesorEliminarComponent implements OnInit {

  public nombreMunipicio: string;
  public idMunicipio: number;

  constructor(public dialogRef: MatDialogRef<ProfesorEliminarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Muniicipio) { }

  ngOnInit(): void {
    this.nombreMunipicio = this.data.nombre;
    this.idMunicipio = this.data.idmunicipio;
  }

  cancelar(): void {
    this.dialogRef.close({
      opcion: "Cancelar" 
    });
  } 

  aceptar(): void {
    this.dialogRef.close({
      opcion: "Aceptar" 
    });
  } 

}
