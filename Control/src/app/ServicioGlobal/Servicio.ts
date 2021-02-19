import { Injectable } from '@angular/core';
import { ServicioTarea } from '../servicio-tarea/Servicio-Tarea';


@Injectable({
  providedIn: 'root'
})
export class ServicioT {

    coleccionTarea : ServicioTarea[] = []; 
  constructor(){}
}