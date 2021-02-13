import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Tareas } from './tarea.service';
import { Tarea } from './tareas';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit(): void {
    this.servicio.get().subscribe((parametro)=>{this.arreglo=parametro;this.actualizar();}) 
    this.formu=this.formBuilder.group({tareId:[''],tareNombre:['',[Validators.required]],tareDescripcion:['',Validators.required],tareUnidadMedida:['',Validators.required],tareCantidad:['',Validators.required],
    tareCosto:['',Validators.required],tareFechaAlta:['']});
    
  }

  submit() {
    if (this.formu.valid) {
      console.log(this.formu.value)
    }
    else{
      alert("*Rellenar todos los campos!")
    }
  }

  columna: string[] = ['tareId', 'tareNombre', 'tareDescripcion', 'tareUnidadMedida', 'tareCantidad', 'tareCosto', 'tareFechaAlta','Discontinued'];
  arreglo: Tarea[] = [];
  table = new MatTableDataSource <Tarea>();

  
  tarSelected = new Tarea();
  formu= new FormGroup({});

  bandera=false;

  constructor(public servicio:Tareas,public formBuilder:FormBuilder,){

  }

    private actualizar() {

    this.table.data=this.arreglo;
    
    }
 
  
    public editar(editar:Tarea){
  
      this.bandera=true;
      this.tarSelected=editar;
      this.formu.setValue(editar);

 }

 public guardar(){
     if(!this.formu.valid){
         return;
     }
     Object.assign(this.tarSelected,this.formu.value);
     if(this.tarSelected.tareId){
       this.servicio.put(this.tarSelected).subscribe(service=>this.bandera=false);
     }else{
       this.servicio.post(this.tarSelected).subscribe((service)=>{this.arreglo.push(service);this.bandera=false;this.actualizar();});
     }

 }

 public borrar(borrar:Tarea){
     
   this.servicio.delete(borrar.tareId).subscribe(()=>{this.arreglo=this.arreglo.filter((servicio)=>{
     if(servicio.tareId!=borrar.tareId){
       return true;
     }else{
       return false;
     }
   });
   this.actualizar();
 });
 }


   public crear(){

     this.formu.reset();
     this.tarSelected=new Tarea();
     this.bandera=true;

   }

   cancelar() {
     this.bandera = false;
   }
}
