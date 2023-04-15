import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAuthComponent } from '../form-auth/form-auth.component';

@Component({
  selector: 'app-auth-view',
  standalone: true,
  imports: [CommonModule, FormAuthComponent],
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss'],
})
export class AuthViewComponent {
  @Input() currentUser: any;
  
  @Output() onSignin = new EventEmitter<any>();

  @Output() onGoToAboutPage = new EventEmitter<Event>();

  @Output() onGoToOppositeForm = new EventEmitter<Event>();

  public titleLink = 'Sign up';

  public instruction = 'Do not have an account?';
}
