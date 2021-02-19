import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GrupService } from './grup.service';
import { Grupo } from './Grupo';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-grup-moviles',
  templateUrl: './grup-moviles.component.html',
  styleUrls: ['./grup-moviles.component.css']
})

export class GrupMovilesComponent implements OnInit {
  
  grupoSelected = new Grupo();
  formulario= new FormGroup({});

  bandera=false;
 
 ngOnInit(): void {
    this.servicio.get().subscribe((parametro)=>{this.array=parametro;this.actualizar();}) 
    this.formulario=this.formBuilder.group({grupId:[''],grupNombre:['',Validators.required],grupDescripcion:['',Validators.required],grupFechaAlta:[''],grupBorrado:['']});
 
  }

  columnas: string[] = ['grupId', 'grupNombre', 'grupDescripcion', 'grupFechaAlta','Discontinued'];
  array: Grupo[] = [];
  table = new MatTableDataSource <Grupo>();

 
  constructor(public servicio:GrupService, public formBuilder:FormBuilder, public dialog: MatDialog){
    
  }
  is_edit : boolean = false;

  public editar(editar:Grupo){

       this.bandera=true;
       this.grupoSelected=editar;
       this.formulario.setValue(editar);

  }

  public guardar(){
      if(!this.formulario.valid){
          return;
      }
      Object.assign(this.grupoSelected,this.formulario.value);
      if(this.grupoSelected.grupId){
        this.servicio.put(this.grupoSelected).subscribe(service=>this.bandera=false);
      }else{
        this.servicio.post(this.grupoSelected).subscribe((service)=>{this.array.push(service);this.bandera=false;this.actualizar();});
      }

  }

  public borrar(borrar:Grupo){
      
    this.servicio.delete(borrar.grupId).subscribe(()=>{this.array=this.array.filter((grupo)=>{
      if(grupo.grupId!=borrar.grupId){
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
      this.grupoSelected=new Grupo();
      this.bandera=true;

    }

    cancelar() {
      this.bandera = false;
    }
 
   
    private actualizar() {

    this.table.data=this.array;
    
    }

    isActive = false;
    
  /*
    openDialog() {
    const dialogRef = this.dialog.open();

    dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
  } 
 */
}


