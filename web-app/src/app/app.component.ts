import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from './core/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { HeaderComponent } from './core/header/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterModule,
    SpinnerComponent,
  ],
})
export class AppComponent {
  title = 'Sleep tracker';
}
