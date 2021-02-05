import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "../core/api-service";
import { AppConfigService } from "../core/config.service";
import { Grupo } from "../grup-moviles/Grupo";


@Injectable({providedIn:'root'})

export class GrupService extends ApiService <Grupo>{

    constructor(public http:HttpClient, public appi:AppConfigService){
        super("grupo",http,appi);
    }

} 