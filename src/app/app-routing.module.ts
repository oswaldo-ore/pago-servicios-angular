import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './dashboard/layouts/layout.component';
import { UnauthguardGuard } from './dashboard/core/guards2/unauthguard.guard';
import { AuthGuard } from './dashboard/core/guards2/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  canActivate:[UnauthguardGuard] },
  { path: '', component: LayoutComponent, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
