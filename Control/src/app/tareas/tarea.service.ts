import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "../core/api-service";
import { AppConfigService } from "../core/config.service";
import { Tarea } from "./tareas";

@Injectable({providedIn:'root'})

export class Tareas extends ApiService <Tarea>{

    constructor(public httpp:HttpClient, public apppi:AppConfigService){
        super("tarea",httpp,apppi);
    }

} 