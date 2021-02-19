import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../core/api-service';
import { AppConfigService } from '../core/config.service';
import { ServicioTarea } from '../servicio-tarea/Servicio-Tarea';

@Injectable({
  providedIn: 'root'
})
export class ServicioTareaService  extends ApiService<ServicioTarea>{
  constructor(protected http: HttpClient,
    protected app: AppConfigService ){
    super("sv-tr", http, app);
  }
}