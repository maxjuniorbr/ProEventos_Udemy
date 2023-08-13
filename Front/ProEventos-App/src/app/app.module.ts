// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Third-party Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';

// Helpers
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';

// Services
import { EventoService } from './services/evento.service';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent,
    DateTimeFormatPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [EventoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
