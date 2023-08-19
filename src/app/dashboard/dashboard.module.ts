import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    LayoutsModule,
    HttpClientModule
  ],
})
export class DashboardModule { }
