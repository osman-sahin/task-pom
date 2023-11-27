import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/common/header/header.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterModule, HeaderComponent, HttpClientModule]
})
export class AppComponent {
  title = 'paymentordermanagement';
}
