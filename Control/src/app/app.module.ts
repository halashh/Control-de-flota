import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrupMovilesComponent } from './grup-moviles/grup-moviles.component';
import { FormularioComponent } from './formulario/formulario.component';
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

@NgModule({
  declarations: [
    AppComponent,
    GrupMovilesComponent,
    FormularioComponent,
    ServiciosComponent,
    TareasComponent
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
  ],
  providers: [ AppConfigService,
    { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [AppConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadConfig(config: AppConfigService) {
  return () => config.load();
}
