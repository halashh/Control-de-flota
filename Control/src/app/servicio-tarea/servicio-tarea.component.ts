import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioT } from '../ServicioGlobal/Servicio';
import { Servicio } from '../servicios/Servicio';
import { Tareas } from '../tareas/tarea.service';
import { Tarea } from '../tareas/tareas';
import { ServicioTareaService } from './serv-tarea.service';
import { ServicioTarea } from './Servicio-Tarea';

@Component({
  selector: 'app-servicio-tarea',
  templateUrl: './servicio-tarea.component.html',
  styleUrls: ['./servicio-tarea.component.css']
})
export class ServicioTareaComponent implements OnInit {

  
  @Input() servId: number = 0;

  SerTarGlobal: ServicioTarea[] = [];
  servClass = new ServicioTarea();
  formulario = new FormGroup({});
  
  constructor(private service: ServicioTareaService, private tservice: Tareas,private formBuilder: FormBuilder,public datosService: ServicioT) {

   }


  columnas: string[] = ['setaTareId','setaServId','tareNombre','Discontinued'];
  table = new MatTableDataSource<ServicioTarea>();
  arrayt: Tarea[] = [];
  bandera = false;
  aux: number = -1;

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({ setaId: [''],setaServId: [''], setaTareId: ['', Validators.required], setaBorrado: [''], setaFechaAlta: [''], tareNombre: [''],})
    this.service.get(`setaServId=${this.servId}`).subscribe((servicioTarea)=>{this.datosService.coleccionTarea = servicioTarea;this.actualizar(); } );
    this.tservice.get().subscribe(  (productos) => {  this.arrayt = productos; })
  }

  actualizar() {
    this.table.data = this.datosService.coleccionTarea.filter(borrado => borrado.setaBorrado==false);
  }

  agregar() {

    this.aux--;
    this.servClass = new ServicioTarea();
    this.servClass.setaId = this.aux;
    this.formulario.setValue(this.servClass)
    this.bandera = true;
  }

  


  guardar() {
    if (!this.formulario.valid) {
      return;
    }

    Object.assign(this.servClass, this.formulario.value);

    this.servClass.tareNombre = this.arrayt.find(tarea => tarea.tareId == this.servClass.setaTareId)!.tareNombre;

    if(this.servClass.setaId > 0){
      const elemento = this.SerTarGlobal.find(sertar => sertar.setaId == this.servClass.setaId);
      this.SerTarGlobal.splice(this.servClass.setaId, 1, elemento!);
    }else{
      this.datosService.coleccionTarea.push(this.servClass);
    }


    this.actualizar();

    this.bandera=false;
  
    
  }

  editar(seleccionado: ServicioTarea) {
    this.bandera = true;
    this.servClass = seleccionado;
    this.formulario.setValue(seleccionado);
  }

  borrar(servTelementos: ServicioTarea) {

        servTelementos.setaBorrado = true;
        this.actualizar();

  }

  nuevo() {

    this.aux--;
    this.servClass = new ServicioTarea();
    this.servClass.setaId = this.aux;
    this.formulario.setValue(this.servClass)
    this.bandera = true;
  }

  cancelar() {
    this.bandera = false;
  }

}
  