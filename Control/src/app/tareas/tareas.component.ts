import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tareas } from './tarea.service';
import { Tarea } from './tareas';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  

  ngOnInit(): void {
    this.servicio.get().subscribe((parametro)=>{this.arreglo=parametro;this.actualizar();}) 
    
  }

  columna: string[] = ['tareId', 'tareNombre', 'tareDescripcion', 'tareUnidadMedida', 'tareCantidad', 'tareCosto', 'tareFechaAlta','Discontinued'];
  arreglo: Tarea[] = [];
  table = new MatTableDataSource <Tarea>();

  

  constructor(public servicio:Tareas){

  }

    private actualizar() {

    this.table.data=this.arreglo;
    
    }

}
