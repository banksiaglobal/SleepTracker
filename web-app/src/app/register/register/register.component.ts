import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterViewComponent } from '../register-view/register-view.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterViewComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {}
