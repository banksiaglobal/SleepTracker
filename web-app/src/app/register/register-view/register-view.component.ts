import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { IUserRegister } from 'src/app/share/interfaces/register';

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [CommonModule, FormRegisterComponent],
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
})
export class RegisterViewComponent {
  @Input() currentUser: any;

  @Output() onSignup = new EventEmitter<IUserRegister>();

  @Output() onGoToOppositeForm = new EventEmitter<Event>();

  @Output() onGoToAboutPage = new EventEmitter<Event>();

  public titleLink = 'Sign in';

  public instruction = 'Already have an account?';
}
