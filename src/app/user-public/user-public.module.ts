import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPublicRoutingModule } from './user-public-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import {MatStepperModule} from '@angular/material/stepper';
import { StepperComponent } from './user-payment/stepper/stepper.component';
@NgModule({
  declarations: [
    UserLoginComponent,
    UserPaymentComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserPublicRoutingModule,
    MatStepperModule,
  ]
})
export class UserPublicModule { }
