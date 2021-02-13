import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "../core/api-service";
import { AppConfigService } from "../core/config.service";
import { Servicio } from "./Servicio";


@Injectable({providedIn:'root'})

export class Servicios extends ApiService <Servicio>{

    constructor(public httpp:HttpClient, public appi:AppConfigService){
        super("servicio",httpp,appi);
    }

} 