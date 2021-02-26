import { Injectable } from '@angular/core';
import { GrupoServicio } from '../servicio-grupo/grupo-servicio';
import { ServicioTarea } from '../servicio-tarea/Servicio-Tarea';


@Injectable({
  providedIn: 'root'
})
export class ServicioT {

    coleccionTarea : ServicioTarea[] = []; 
    coleccionGrupoServicio : GrupoServicio[] = [];
  constructor(){}
}