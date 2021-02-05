import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GrupService } from './grup.service';
import { Grupo } from './Grupo';



@Component({
  selector: 'app-grup-moviles',
  templateUrl: './grup-moviles.component.html',
  styleUrls: ['./grup-moviles.component.css']
})

export class GrupMovilesComponent implements OnInit {
  
  grupoSelected = new Grupo();
  

 ngOnInit(): void {
    this.servicio.get().subscribe((parametro)=>{this.array=parametro;this.actualizar();}) 
   
 
  }

  columnas: string[] = ['grupId', 'grupNombre', 'grupDescripcion', 'grupFechaAlta','Discontinued'];
  array: Grupo[] = [];
  table = new MatTableDataSource <Grupo>();

 
  constructor(public servicio:GrupService, public formBuilder:FormBuilder){
    
  }
 
    private actualizar() {

    this.table.data=this.array;
    
    }

    


}
