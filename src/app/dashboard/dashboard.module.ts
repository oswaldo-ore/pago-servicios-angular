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
import { FacturasComponent } from './pagos/facturas/facturas.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { DetallefacturaComponent } from './pagos/detallefactura/detallefactura.component';
import { MedidoresComponent } from './configuracion/medidores/medidores.component';
@NgModule({
  declarations: [
    PrincipalComponent,
    ServiciosComponent,
    UsuariosComponent,
    SuscripcionesComponent,
    FacturasComponent,
    MedidoresComponent,
    DetallefacturaComponent
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
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
  ],
})
export class DashboardModule { }
