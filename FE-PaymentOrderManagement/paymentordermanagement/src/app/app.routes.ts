import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'payment', loadChildren: () => import('./modules/payment.module').then(m => m.PaymentModule) },
];