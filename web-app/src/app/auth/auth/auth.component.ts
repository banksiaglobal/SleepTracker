import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthViewComponent } from '../auth-view/auth-view.component';
import { AuthService } from 'src/app/share/services/auth.service';
import { tap, catchError, throwError } from 'rxjs';
import { MessagesService } from 'src/app/share/services/message.service';
import { IUserAuth } from 'src/app/share/interfaces/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, AuthViewComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private message: MessagesService
  ) {}

  public onSignin(signinForm: IUserAuth): void {
    this.auth
      .signIn(signinForm)
      .pipe(
        tap(() => this.goToApp()),
        tap(() => {
          const message = 'Welcome to app!';
          this.message.shomMessage(message);
        }),

        catchError((error: any) => {
          const message = 'The auth is cancelled';
          // const errorMessage = error.error.errors[0].params[0];
          this.message.shomMessage(message);
          this.router.navigate(['/signin']);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  private goToApp(): void {
    this.router.navigate(['/data']);
  }

  public onGoToOppositeForm() {
    this.router.navigate(['/signup']);
  }

  public onGoToAboutPage() {
    this.router.navigate(['/about']);
  }
}
