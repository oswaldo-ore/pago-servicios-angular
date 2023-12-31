import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DetallepagousuarioComponent } from './configuracion/detallepagousuario/detallepagousuario.component';
import { UserModalComponent } from './configuracion/usuarios/user-modal/user-modal.component';
import { SuscripcionModalComponent } from './configuracion/suscripciones/suscripcion-modal/suscripcion-modal.component';
import { UserBuyModalComponent } from './configuracion/usuarios/user-buy-modal/user-buy-modal.component';
import { DeudasMensualesComponent } from './informe/deudas-mensuales/deudas-mensuales.component';
import { DetalleDeudaMensualComponent } from './informe/deudas_mensuales/detalle-deuda-mensual/detalle-deuda-mensual.component';
import { WhatsappComponent } from './configuracion/whatsapp/whatsapp.component';
@NgModule({
  declarations: [
    ServiciosComponent,
    UsuariosComponent,
    SuscripcionesComponent,
    FacturasComponent,
    MedidoresComponent,
    DetallefacturaComponent,
    DetallepagousuarioComponent,
    UserModalComponent,
    SuscripcionModalComponent,
    UserBuyModalComponent,
    DeudasMensualesComponent,
    DetalleDeudaMensualComponent,
    WhatsappComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
})
export class DashboardModule { }
