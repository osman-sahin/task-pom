import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styles: `table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() service: any; 


  delete(id: string){
    this.service.delete(id, this.service.controller).subscribe((r: any) => {
      alert(r.response_message);
    });
  }
}