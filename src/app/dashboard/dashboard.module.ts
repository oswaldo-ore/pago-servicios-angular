import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';
import { ServiciosComponent } from './configuracion/servicios/servicios.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { SuscripcionesComponent } from './configuracion/suscripciones/suscripciones.component';
@NgModule({
  declarations: [
    PrincipalComponent,
    ServiciosComponent,
    UsuariosComponent,
    SuscripcionesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class DashboardModule { }
