import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './configuracion/servicios/servicios.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { SuscripcionesComponent } from './configuracion/suscripciones/suscripciones.component';
import { FacturasComponent } from './pagos/facturas/facturas.component';
import { DetallefacturaComponent } from './pagos/detallefactura/detallefactura.component';
import { MedidoresComponent } from './configuracion/medidores/medidores.component';
import { DetallepagousuarioComponent } from './configuracion/detallepagousuario/detallepagousuario.component';

const routes: Routes = [
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


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
