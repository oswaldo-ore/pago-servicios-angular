import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './dashboard/layouts/layout.component';
import { AuthGuard } from './dashboard/core/guards2/auth.guard';
import { UnauthguardGuard } from './dashboard/core/guards2/unauthguard.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'admin/login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate:[UnauthguardGuard]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
