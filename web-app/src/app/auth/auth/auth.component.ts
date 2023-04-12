import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthViewComponent } from '../auth-view/auth-view.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, AuthViewComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private router: Router) {}

  public onSignin(signinForm: any): void {
    console.log(signinForm);
    if (signinForm) {
      this.goToApp();
    }
  }

  private goToApp(): void {
    this.router.navigate(['/data']);
  }

  public onGoToOppositeForm() {
    this.router.navigate(['/signup']);
  }
}
