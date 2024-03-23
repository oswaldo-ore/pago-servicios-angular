import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './configuracion/servicios/servicios.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { SuscripcionesComponent } from './configuracion/suscripciones/suscripciones.component';
import { FacturasComponent } from './pagos/facturas/facturas.component';
import { DetallefacturaComponent } from './pagos/detallefactura/detallefactura.component';
import { MedidoresComponent } from './configuracion/medidores/medidores.component';
import { DetallepagousuarioComponent } from './configuracion/detallepagousuario/detallepagousuario.component';
import { DeudasMensualesComponent } from './informe/deudas-mensuales/deudas-mensuales.component';
import { WhatsappComponent } from './configuracion/whatsapp/whatsapp.component';
import { VeripagosComponent } from './configuracion/veripagos/veripagos.component';
import { MovementsComponent } from './configuracion/movements/movements.component';
import { PrePaymentComponent } from './configuracion/pre-payment/pre-payment.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: "", component: MainComponent,
  },
  {
    path: "servicios", component: ServiciosComponent,
  },
  {
    path: "usuarios", component: UsuariosComponent,
  },
  {
    path: "suscripciones", component: SuscripcionesComponent,
  },
  {
    path: "suscripciones/:id", component: MedidoresComponent,
  },
  {
    path: "facturas", component: FacturasComponent,
  },
  {
    path: "factura/:id", component: DetallefacturaComponent,
  },
  {
    path: "usuario/detalle-deudas/:id", component: DetallepagousuarioComponent,
  },
  {
    path: "usuario/detalle-movimientos/:id", component: MovementsComponent,
  },
  {
    path: "usuario/detalle-adelantos/:id", component: PrePaymentComponent,
  },
  {
    path: "deudas-mensuales", component: DeudasMensualesComponent,
  },
  {
    path: "whatsapp", component: WhatsappComponent,
  },
  {
    path: "veripagos", component: VeripagosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
