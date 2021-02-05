import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Servicio } from './Servicio';
import { Servicios } from './Servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  ngOnInit(): void {
    this.servicio.get().subscribe((parametro)=>{this.arreglo=parametro;this.actualizar();}) 
    
  }

  columna: string[] = ['servId', 'servNombre', 'servDescripcion', 'servPeriodo', 'servKM', 'servFecha', 'servFechaAlta','Discontinued'];
  arreglo: Servicio[] = [];
  table = new MatTableDataSource <Servicio>();

  

  constructor(public servicio:Servicios){

  }

    private actualizar() {

    this.table.data=this.arreglo;
    
    }

}
