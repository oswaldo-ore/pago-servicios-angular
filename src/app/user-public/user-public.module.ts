import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPublicRoutingModule } from './user-public-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import {MatStepperModule} from '@angular/material/stepper';
import { StepperComponent } from './user-payment/stepper/stepper.component';
import { DebtsComponent } from './user-payment/debts/debts.component';
import {
  NgbModule,
  NgbPaginationModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    UserLoginComponent,
    UserPaymentComponent,
    StepperComponent,
    DebtsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserPublicRoutingModule,
    MatStepperModule,
    NgbPaginationModule,
    NgbModule,
    NgbTooltip
  ]
})
export class UserPublicModule { }
