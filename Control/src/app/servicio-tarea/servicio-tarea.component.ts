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

  

  ngOnInit(): void {

    this.tareaService.get().subscribe(parametro=>this.array=parametro);
    this.ServicioTr.get(`setaServId=${this.servId}`).subscribe((parametro)=>{this.ServicioT.coleccionTarea=parametro;this.actualizar();});
    this.formulario=this.formBuilder.group({setaId:[''],setaServId:['',Validators.required],setaTareId:['',Validators.required],setaFechaAlta:[''],tareNombre:['']});

  }

  @Input() servId : number = 0 ;

  aux:number = -1 ;

  bandera=false;

  svTar = new ServicioTarea();
  arregloServicioTar : ServicioTarea[]=[];
  formulario= new FormGroup({});
  columnas: string[] = ['setaId', 'setaServId', 'setaTareId', 'setaFechaAlta','tareNombre','Discontinued'];

  array: Tarea[] = [];

  table = new MatTableDataSource <ServicioTarea>();
  


  constructor(public ServicioTr:ServicioTareaService, public formBuilder:FormBuilder, public dialog: MatDialog, public ServicioT:ServicioT, public tareaService:Tareas){
    
  }


  public editar(editar:ServicioTarea){

    this.bandera=true;
    this.svTar=editar;
    this.formulario.setValue(editar);
    this.actualizar();

}

public guardar(){
   if(!this.formulario.valid){
       return;
   }

   Object.assign(this.svTar,this.formulario.value);


   this.svTar.tareNombre=this.array.find(parametro=>parametro.tareId==this.svTar.setaTareId)!.tareNombre;


   if(this.svTar.setaId>0){

    const elemento = this.arregloServicioTar .find(arregloServicioTar  => arregloServicioTar .setaId == this.svTar.setaId);

    this.arregloServicioTar .splice(this.svTar.setaId, 1, elemento!);

   }else{
     this.ServicioT.coleccionTarea.push(this.svTar);
   }


   this.bandera=false;
   this.actualizar();

}

public borrar(borrar:ServicioTarea){
   
 this.ServicioTr.delete(borrar.setaId).subscribe(()=>{this.arregloServicioTar=this.arregloServicioTar.filter((ServicioTarea)=>{
   if(ServicioTarea.setaId!=borrar.setaId){
     return true;
   }else{
     return false;
   }
 });
 this.actualizar();
});
}


 public crear(){

   this.formulario.reset();
   this.svTar=new ServicioTarea();
   this.bandera=true;

 }

 cancelar() {
   this.bandera = false;
 }


 private actualizar() {

     this.table.data=this.ServicioT.coleccionTarea.filter(borrado=>borrado.setaBorrado = false);
    
    }


}
  