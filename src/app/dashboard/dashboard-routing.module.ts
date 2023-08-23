import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './configuracion/servicios/servicios.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { SuscripcionesComponent } from './configuracion/suscripciones/suscripciones.component';
import { FacturasComponent } from './pagos/facturas/facturas.component';
import { MedidoresComponent } from './pagos/medidores/medidores.component';

const routes: Routes = [
  {
    path: "", component: ServiciosComponent,
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
    path: "facturas", component: FacturasComponent,
  },
  {
    path: "medidores", component: MedidoresComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
