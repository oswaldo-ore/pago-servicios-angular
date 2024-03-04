import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiciosComponent } from './configuracion/servicios/servicios.component';
import { NgbModule, NgbPaginationModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { SuscripcionesComponent } from './configuracion/suscripciones/suscripciones.component';
import { FacturasComponent } from './pagos/facturas/facturas.component';
import { DetallefacturaComponent } from './pagos/detallefactura/detallefactura.component';
import { MedidoresComponent } from './configuracion/medidores/medidores.component';
import { DetallepagousuarioComponent } from './configuracion/detallepagousuario/detallepagousuario.component';
import { UserModalComponent } from './configuracion/usuarios/user-modal/user-modal.component';
import { SuscripcionModalComponent } from './configuracion/suscripciones/suscripcion-modal/suscripcion-modal.component';
import { UserBuyModalComponent } from './configuracion/usuarios/user-buy-modal/user-buy-modal.component';
import { DeudasMensualesComponent } from './informe/deudas-mensuales/deudas-mensuales.component';
import { DetalleDeudaMensualComponent } from './informe/deudas_mensuales/detalle-deuda-mensual/detalle-deuda-mensual.component';
import { WhatsappComponent } from './configuracion/whatsapp/whatsapp.component';
import { VeripagosComponent } from './configuracion/veripagos/veripagos.component';
import { MovementsComponent } from './configuracion/movements/movements.component';
import { DetailsComponent } from './configuracion/movements/details/details.component';
import { ModalCreateDebtComponent } from './configuracion/detallepagousuario/modal-create-debt/modal-create-debt.component';
import { ModalPrePaymentComponent } from './configuracion/detallepagousuario/modal-pre-payment/modal-pre-payment.component';
import { BackButtonComponent } from './layouts/back-button/back-button/back-button.component';
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
    WhatsappComponent,
    VeripagosComponent,
    MovementsComponent,
    DetailsComponent,
    ModalCreateDebtComponent,
    ModalPrePaymentComponent,
    BackButtonComponent
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
    MatCheckboxModule,
    NgbTooltip,
    FlatpickrModule.forRoot(),
  ],
})
export class DashboardModule { }
