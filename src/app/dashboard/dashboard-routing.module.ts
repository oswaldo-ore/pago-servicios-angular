import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './configuracion/servicios/servicios.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { SuscripcionesComponent } from './configuracion/suscripciones/suscripciones.component';

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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
