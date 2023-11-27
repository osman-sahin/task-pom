import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { PaymentsService } from '../../../services/payments.service';
import { TableComponent } from "../../common/table/table.component";

@Component({
  selector: 'app-list-payment',
  standalone: true,
  templateUrl: './list-payment.component.html',
  styles: ``,
  imports: [CommonModule, TableComponent]
})
export class ListPaymentComponent implements OnInit {

  dataSource: any;
  columns: any;
  _service: any;
  constructor(
    private service: PaymentsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this._service = this.service
    this.columns = [
        "id",
        "creditor_account",
        "debtor_account",
        "amount",
        "date",
        "currency",
        "is_deleted"
    ];
    this.dataSource = [
      {
        "id": "e056bf29-5779-4e67-ac08-d4f07f0871b4",
        "creditor_account": "zxcxzczxcasda",
        "debtor_account": "nfnfnzcntc",
        "amount": 1123231,
        "date": "21122022",
        "currency": "TRY",
        "is_deleted": false
      },
      {
        "id": "529a71b4-abf0-4b91-a91c-5b7d3904a53b",
        "creditor_account": "vsvsxzczxcasda",
        "debtor_account": "zxcznfnzcntc",
        "amount": 223231,
        "date": "10122022",
        "currency": "TRY",
        "is_deleted": false
      }
    ];

    this.service.getAll(this.service.controller).subscribe(r => {
      console.warn(r)
      if(r.response_key === 'SUCCESS'){
        this.dataSource = r.data;
      }
      else{
        alert("Showing Mock Data");
      }
    });
  }

  onDelete(id: string) {
    this.service.delete(id, this.service.controller).subscribe(r => {
      alert(r.response_key);
    })
  }

  ngOnDestroy(): void {
  }

  goBack() {
    this.location.back();
  }

}
