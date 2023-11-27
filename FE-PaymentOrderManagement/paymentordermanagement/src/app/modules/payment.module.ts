import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from '../routes/payment-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaymentModule { }
