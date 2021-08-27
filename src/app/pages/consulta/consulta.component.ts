import { Consulta } from './../../_model/Consulta';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'fecha'];
  dataSource = new MatTableDataSource<Consulta>();

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
      //Peticion
      this.consultaService.retorar().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
      });
  }

  applyFilter(filtro: string) {
      this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
