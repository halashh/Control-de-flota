import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrupMovilesComponent } from './grup-moviles/grup-moviles.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TareasComponent } from './tareas/tareas.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AppConfigService } from './core/config.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ServicioTareaComponent } from './servicio-tarea/servicio-tarea.component';
import { ServicioGrupoComponent } from './servicio-grupo/servicio-grupo.component';
import { MovilComponent } from './movil/movil.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MatPaginatorModule } from '@angular/material/paginator';






@NgModule({
  declarations: [
    AppComponent,
    GrupMovilesComponent,
    ServiciosComponent,
    TareasComponent,
    ServicioTareaComponent,
    ServicioGrupoComponent,
    MovilComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatNativeDateModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    NgxPaginationModule,
    MatPaginatorModule,
  
    
    
    
  ],
  exports:[
    MatDialogModule,
  ],
  providers: [ AppConfigService,
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [AppConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadConfig(config: AppConfigService) {
  return () => config.load();
}
