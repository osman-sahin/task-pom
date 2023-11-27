import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentsService } from '../../../services/payments.service';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-payment.component.html',
  styles: `
  .label{
    width: 40px !important;
  }`
})
export class AddPaymentComponent implements OnInit {
  submitted = false;
  controller = "payments"
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  addForm: FormGroup;
  editingId: string;
  constructor(
    private fb: FormBuilder,
    private service: PaymentsService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      creditor_account: ['', [Validators.required, Validators.maxLength(34), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      debtor_account: ['', [Validators.required, Validators.maxLength(34), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      date: ['', [Validators.required]],
      currency: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[A-z]+$')]],
      amount: ['', [Validators.required, Validators.pattern(this.numRegex)]],
    })
  }
  get f() {
    return this.addForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid){
      this.service.add(this.addForm.value, this.service.controller).subscribe(r => {
        alert(r.response_key);
      })
    }
    else{
      alert("invalid form data")
    }
    this.submitted =false;
  }

  goBack() {
    this.location.back()
  }
}
