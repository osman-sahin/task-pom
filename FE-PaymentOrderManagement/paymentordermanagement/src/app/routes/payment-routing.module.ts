import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentComponent } from '../components/payment/list-payment/list-payment.component';
import { AddPaymentComponent } from '../components/payment/add-payment/add-payment.component';
import { UpdatePaymentComponent } from '../components/payment/update-payment/update-payment.component';

const routes: Routes = [
  { path: '', component: ListPaymentComponent },
  { path: 'add', component: AddPaymentComponent },
  { path: ':id', component: UpdatePaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
