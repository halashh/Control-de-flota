import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    this.formu=this.formBuilder.group({servId:[''],servNombre:['',Validators.required],servDescripcion:['',Validators.required],servPeriodo:['',Validators.required],servKM:['',Validators.required],
    servFecha:['',Validators.required],servFechaAlta:[''],servBorrado:['']});
  }

  columna: string[] = ['servId', 'servNombre', 'servDescripcion', 'servPeriodo', 'servKM', 'servFecha', 'servFechaAlta','Discontinued'];
  arreglo: Servicio[] = [];
  table = new MatTableDataSource <Servicio>();

  servSelected = new Servicio();
  formu= new FormGroup({});

  bandera=false;

  constructor(public servicio:Servicios,public formBuilder:FormBuilder, public dialog: MatDialog){

  }

    private actualizar() {

    this.table.data=this.arreglo;
    
    }
   
   
  
    public editar(editar:Servicio){
  
         this.bandera=true;
         this.servSelected=editar;
         this.formu.setValue(editar);
  
    }
  
    public guardar(){
        if(!this.formu.valid){
            return;
        }
        Object.assign(this.servSelected,this.formu.value);
        if(this.servSelected.servId){
          this.servicio.put(this.servSelected).subscribe(service=>this.bandera=false);
        }else{
          this.servicio.post(this.servSelected).subscribe((service)=>{this.arreglo.push(service);this.bandera=false;this.actualizar();});
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
        this.servSelected=new Servicio();
        this.bandera=true;
  
      }
  
      cancelar() {
        this.bandera = false;
      }
   
     
      

}
