import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthViewComponent } from '../auth-view/auth-view.component';
import { AuthService } from 'src/app/share/services/auth.service';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { MessagesService } from 'src/app/share/services/message.service';
import { IUserAuth } from 'src/app/share/interfaces/auth';
import { LoadingService } from 'src/app/share/services/loading.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, AuthViewComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public currentUser$: Observable<any>;

  constructor(
    private router: Router,
    private auth: AuthService,
    private message: MessagesService,
    private loadingService: LoadingService
  ) {
    if (this.auth.user.value) {
      this.goToApp();
    }
  }

  public onSignin(signinForm: IUserAuth): void {
    const currentUser$ = this.auth.signIn(signinForm).pipe(
      tap(() => {
        const message = 'Welcome to app!';
        this.message.shomMessage(message);
      }),
      catchError((error: any) => {
        const message = 'The auth is cancelled';
        // const errorMessage = error.error.errors[0].params[0];
        this.message.shomMessage(message);
        return throwError(() => error);
      })
    );

    this.currentUser$ =
      this.loadingService.showSpinnerUntilCompleted(currentUser$);
  }

  private goToApp(): void {
    this.router.navigate(['/sleep']);
  }

  public onGoToOppositeForm() {
    this.router.navigate(['/signup']);
  }

  public onGoToAboutPage() {
    this.router.navigate(['/sleep']);
  }
}
