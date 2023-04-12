import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterViewComponent } from '../register-view/register-view.component';
import { IUserRegister } from 'src/app/share/interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterViewComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router) {}

  public onSignup(signupForm: IUserRegister): void {
    if (signupForm) {
      this.goToApp();
    }
  }

  private goToApp(): void {
    this.router.navigate(['/data']);
  }

  public onGoToOppositeForm() {
    this.router.navigate(['/signin']);
  }
}
