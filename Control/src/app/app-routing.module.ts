import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupMovilesComponent } from './grup-moviles/grup-moviles.component';
import { MovilComponent } from './movil/movil.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TareasComponent } from './tareas/tareas.component';


const routes: Routes = [{ path: '', redirectTo:"/GrupMovil",pathMatch:"full" },
 {path: 'GrupMovil', component: GrupMovilesComponent, data: { title: "Grupo Movil" } },
 { path: 'Serv', component: ServiciosComponent, data: { title: 'Servicios' } },
 { path: 'Tareas', component: TareasComponent, data: { title: 'Tareas' } },
 { path: 'Moviles', component: MovilComponent, data: { title: 'Moviles' } }];
 
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
