import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentsService } from '../../../services/payments.service';
import { Payment } from '../../../entities/payment';

@Component({
  selector: 'app-update-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-payment.component.html',
  styles: ``
})
export class UpdatePaymentComponent {
  submitted = false;
  controller = "payments"
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  updateForm: FormGroup;
  editingId: string;
  dataSource: Payment;
  constructor(
    private fb: FormBuilder,
    private service: PaymentsService,
    private location: Location,
    private router: ActivatedRoute
  ) {
    this.editingId = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.createForm();
    this.getData();

    this.dataSource =
    {
      "id": "e056bf29-5779-4e67-ac08-d4f07f0871b4",
      "creditor_account": "zxcxzczxcasda",
      "debtor_account": "nfnfnzcntc",
      "amount": 1123231,
      "date": "21122022",
      "currency": "TRY",
      "is_deleted": false
    };

    this.updateForm.patchValue(this.dataSource)
  }

  createForm() {
    this.updateForm = this.fb.group({
      id: ['', [Validators.required, Validators.maxLength(36), Validators.minLength(36)]],
      creditor_account: ['', [Validators.required, Validators.maxLength(34), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      debtor_account: ['', [Validators.required, Validators.maxLength(34), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      date: ['', [Validators.required]],
      currency: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^[A-z]+$')]],
      amount: ['', [Validators.required, Validators.pattern(this.numRegex)]],
    })
  }
  get f() {
    return this.updateForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.updateForm.valid) {
      this.service.update(this.updateForm.value, this.service.controller).subscribe(r => {
        alert(r.response_key);
      })
    }
    else {
      alert("invalid form data")
    }
    this.submitted = false;
  }

  getData() {
    this.service.getById(this.editingId, this.service.controller).subscribe(r => {
      if (r.response_key === 'SUCCESS') {
        this.updateForm.patchValue(r.data)
      } else {
        alert(r.response_key);
      }
    })
  }

  goBack() {
    this.location.back()
  }
}
