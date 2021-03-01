import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GrupService } from './grup.service';
import { Grupo } from './Grupo';
import {MatDialog} from '@angular/material/dialog';
import { ServicioT } from '../ServicioGlobal/Servicio';
import { GrupoServicioService } from '../servicio-grupo/grupo-servicio.service';



@Component({
  selector: 'app-grup-moviles',
  templateUrl: './grup-moviles.component.html',
  styleUrls: ['./grup-moviles.component.css']
})

export class GrupMovilesComponent implements OnInit {
  
  grupoServ = new Grupo();
  formulario= new FormGroup({});
  @Input() grupId: number = 0;
  bandera=false;

  public page:number = 0;
 
 ngOnInit(): void {
    this.servicio.get().subscribe((parametro)=>{this.array=parametro;this.actualizar();}) 
    this.formulario=this.formBuilder.group({grupId:[''],grupNombre:['',Validators.required],grupDescripcion:['',Validators.required],grupFechaAlta:[''],grupBorrado:['']});
 
  }

  columnas: string[] = ['grupId', 'grupNombre', 'grupDescripcion', 'grupFechaAlta','Discontinued'];
  array: Grupo[] = [];
  table = new MatTableDataSource <Grupo>();

 
  constructor(public servicio:GrupService, public formBuilder:FormBuilder, public dialog: MatDialog, public servicioT:ServicioT, public grupServicio:GrupoServicioService){
    
  }
  is_edit : boolean = false;

  public editar(editar:Grupo){

       this.bandera=true;
       this.grupoServ=editar;
       this.formulario.setValue(editar);

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
      this.grupoServ=new Grupo();
      this.bandera=true;

    }

    actualizarGrupoServ(id : number){
      this.servicioT.coleccionGrupoServicio.forEach( (dato) => { dato.grusGrupId = id;
        if(dato.grusBorrado){
          this.grupServicio.delete(dato.grusId).subscribe();
        }else if(dato.grusId < 0){
          this.grupServicio.post(dato).subscribe();
        }else (dato.grusId > 0 )
          this.grupServicio.put(dato).subscribe();
        }
     );
      this.actualizar();
      this.bandera = false;
    }

    cancelar() {
      this.bandera = false;
    }
 
    guardarGrupoServicio() {
      if (!this.formulario.valid) {
        return;
      }
  
      Object.assign(this.grupoServ, this.formulario.value);
  
      if (this.grupoServ.grupId) {
        this.servicio.put(this.grupoServ)
          .subscribe((grupo) => {
            this.actualizarGrupoServ(grupo.grupId);
          });
  
      } else {
        this.servicio.post(this.grupoServ)
          .subscribe((grupo) => {
            this.array.push(grupo);
            this.actualizarGrupoServ(grupo.grupId);
          });
  
      }
  
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


