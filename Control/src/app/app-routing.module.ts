import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { GrupMovilesComponent } from './grup-moviles/grup-moviles.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TareasComponent } from './tareas/tareas.component';


const routes: Routes = [{ path: '', redirectTo:"/GrupMovil",pathMatch:"full" },
 {path: 'GrupMovil', component: GrupMovilesComponent, data: { title: "Grupo Movil" } },
 { path: 'Serv', component: ServiciosComponent, data: { title: 'Servicios' } },
 { path: 'Tareas', component: TareasComponent, data: { title: 'Tareas' } },
 { path: 'Formulario', component: FormularioComponent, data: { title: 'Formulario' } }];
 
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
