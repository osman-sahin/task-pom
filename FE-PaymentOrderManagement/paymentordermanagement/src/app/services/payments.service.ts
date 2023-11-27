import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends BaseService {

  controller = "payments/";

  super() { }

}
