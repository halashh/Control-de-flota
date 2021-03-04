import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Movil } from './Movil';
import { MovilService } from './MovilService';
import { AfterViewInit} from '@angular/core';


import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-movil',
  templateUrl: './movil.component.html',
  styleUrls: ['./movil.component.css']
})
export class MovilComponent implements OnInit {



  constructor(public movilService : MovilService, public formBuilder : FormBuilder) { }

  //@Input() moviId : number = 0;

  moviles : Movil [] = [];
  columnas: string[] = ['movilID', 'patente','descripcion', 'dependencia', 'Discontinued'];
  table = new MatTableDataSource<Movil>();
  
  formulario = new FormGroup({});
  bandera = false;

  @ViewChild(MatSort) sort! : MatSort;



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  

  ngAfterViewInit(): void {
    this.table.sort = this.sort;
    this.table.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({moviId: [''],moviModoFecha: ['', Validators.required],moviModoOdometro: ['', Validators.required],moviBorrado: [''],moviFechaAlta: ['']});

    this.movilService.get().subscribe(
      (movil) => {
        this.moviles = movil;
        this.actualizar();
      }
    )

    
  }

  actualizar(){
   this.table.data = this.moviles;
   this.table.sort = this.sort;
  }


  

  

  cancelar() {
    this.bandera = false;
  }


}

