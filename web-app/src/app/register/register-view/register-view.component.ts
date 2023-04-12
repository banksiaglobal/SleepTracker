import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IUserRegister } from 'src/app/share/interfaces/register';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [CommonModule, FormRegisterComponent, ReactiveFormsModule],
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
})
export class RegisterViewComponent {
  @Output() onSignup = new EventEmitter<IUserRegister>();

  @Output() onGoToOppositeForm = new EventEmitter<Event>();

  public titleLink = 'Sign in';

  public instruction = 'Already have an account?';
}
