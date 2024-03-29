import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'payment', component: UserPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPublicRoutingModule { }
