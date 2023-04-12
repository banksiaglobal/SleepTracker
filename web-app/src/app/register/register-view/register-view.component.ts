import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [CommonModule, FormRegisterComponent, ReactiveFormsModule],
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
})
export class RegisterViewComponent {
 
}
