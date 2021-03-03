import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioT } from '../ServicioGlobal/Servicio';
import { Servicio } from '../servicios/Servicio';
import { Servicios } from '../servicios/Servicio.service';
import { GrupoServicio } from './grupo-servicio';
import { GrupoServicioService } from './grupo-servicio.service';



@Component({
  selector: 'app-servicio-grupo',
  templateUrl: './servicio-grupo.component.html',
  styleUrls: ['./servicio-grupo.component.css']
})
export class ServicioGrupoComponent implements OnInit {
 
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.table.paginator = this.paginator;
  }

  @Input() grupId: number = 0;

  public page:number = 0;

  arrayGrupServ: GrupoServicio[] = [];
  grupServ = new GrupoServicio();

  columnas: string[] = ['grusId', 'servNombre', 'grusPeriodo', 'grusKM', 'grusFecha','Discontinued'];
  table = new MatTableDataSource<GrupoServicio>();


  formulario = new FormGroup({});
  bandera = false;

  servicios: Servicio[] = [];
  aux: number = -1;
  

  constructor(private grupoServicioService: GrupoServicioService, private servicioService: Servicios, private formBuilder: FormBuilder,public dialog: MatDialog,public serviciosT: ServicioT) { 

  }


  ngOnInit(): void {

    this.formulario = this.formBuilder.group({grusId: [''],grusGrupId: [''],grusServId: ['',Validators.required],grusPeriodo: [''],grusKM: [''],grusFecha: [''],grusBorrado: [''],grusFechaAlta: [''],servNombre: [''],
    });

    this.grupoServicioService.get(`grusGrupId=${this.grupId}`).subscribe(
      (grupoServicio) => {
        this.serviciosT.coleccionGrupoServicio = grupoServicio;
        this.actualizarTabla();
      }
    );

    this.servicioService.get().subscribe(
      (servicios) => {
        this.servicios = servicios;
      }
    )
  }

  actualizarTabla() {
    this.table.data = this.serviciosT.coleccionGrupoServicio.filter(actualizado => actualizado.grusBorrado==false);
  }

  crear() {
    this.aux--;
    this.grupServ = new GrupoServicio();
    this.grupServ.grusId = this.aux;
    this.formulario.setValue(this.grupServ)
    this.bandera = true;
  }

  borrar(fila: GrupoServicio) {

        fila.grusBorrado = true;
        this.actualizarTabla();
     
  }

  editar(seleccionado: GrupoServicio) {
    this.bandera = true;
    this.grupServ = seleccionado;
    this.formulario.setValue(seleccionado);

  }


  guardar() {
    if (!this.formulario.valid) {
      return;
    }

    Object.assign(this.grupServ, this.formulario.value);

    this.grupServ.servNombre = this.servicios.find(servicio => servicio.servId == this.grupServ.grusServId)!.servNombre;
    this.grupServ.grusPeriodo = this.servicios.find(servicio  => servicio.servId == this.grupServ.grusServId)!.servPeriodo;
    this.grupServ.grusKM = this.servicios.find(servicio  => servicio.servId == this.grupServ.grusServId)!.servKM;
    this.grupServ.grusFecha = this.servicios.find(servicio  => servicio.servId == this.grupServ.grusServId)!.servFecha;

    if(this.grupServ.grusId > 0){
      const elemento = this.arrayGrupServ.find(gruser => gruser.grusId == this.grupServ.grusId);
      this.arrayGrupServ.splice(this.grupServ.grusId, 1, elemento!);
    }else{
      this.serviciosT.coleccionGrupoServicio.push(this.grupServ);
    }

    this.bandera=false;
    this.actualizarTabla();
  }

  cancelar() {
    this.bandera = false;
  }

  


}