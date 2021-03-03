import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioTareaService } from '../servicio-tarea/serv-tarea.service';
import { ServicioTareaComponent } from '../servicio-tarea/servicio-tarea.component';
import { ServicioT } from '../ServicioGlobal/Servicio';
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
    this.formu=this.formBuilder.group({servId:[''],servNombre:['',Validators.required],servDescripcion:['',Validators.required],servPeriodo:['',Validators.required],servKM:['',Validators.required],
    servFecha:['',Validators.required],servFechaAlta:[''],servBorrado:['']});
  }
  public page : number = 0 ;
  columna: string[] = ['servId', 'servNombre', 'servDescripcion', 'servPeriodo', 'servKM', 'servFecha', 'servFechaAlta','Discontinued'];
  arreglo: Servicio[] = [];
  table = new MatTableDataSource <Servicio>();

  service = new Servicio();
  formu= new FormGroup({});

  bandera=false;

  constructor(public servicio:Servicios,public formBuilder:FormBuilder, public dialog: MatDialog, public servicioT:ServicioT, public servTar:ServicioTareaService){

  }

    private actualizar() {

    this.table.data=this.arreglo;
    
    }
   
   
  
    public editar(editar:Servicio){
  
         this.bandera=true;
         this.service=editar;
         this.formu.setValue(editar);
  
    }
  
    public guardar(){
        if(!this.formu.valid){
            return;
        }
        Object.assign(this.service,this.formu.value);
        if(this.service.servId){
          this.servicio.put(this.service).subscribe(service=>this.ServicioTareaActualizar(service.servId));
        }else{
          this.servicio.post(this.service).subscribe((service)=>{this.arreglo.push(service);this.ServicioTareaActualizar(service.servId)});
        }
        
  
    }
  
    public borrar(borrar:Servicio){
        
      this.servicio.delete(borrar.servId).subscribe(()=>{this.arreglo=this.arreglo.filter((servicio)=>{
        if(servicio.servId!=borrar.servId){
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
        this.service=new Servicio();
        this.bandera=true;
  
      }
  
      cancelar() {
        this.bandera = false;
      }
   
     
      ServicioTareaActualizar(id : number){
        this.servicioT.coleccionTarea.forEach( (dato) => { dato.setaServId = id;
          if(dato.setaBorrado){
            this.servTar.delete(dato.setaId).subscribe();
          }else if(dato.setaId < 0){
            this.servTar.post(dato).subscribe();
          }else (dato.setaId > 0 )
            this.servTar.put(dato).subscribe();
          }
       );
        this.actualizar();
        this.bandera = false;
      }


     
}
