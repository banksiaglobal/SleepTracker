import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterViewComponent } from '../register-view/register-view.component';
import { IUserRegister } from 'src/app/share/interfaces/register';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/share/services/register.service';
import { catchError, tap, throwError } from 'rxjs';
import { MessagesService } from 'src/app/share/services/message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterViewComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private registre: RegistrationService,
    private message: MessagesService
  ) {}

  public onSignup(signupForm: IUserRegister): void {
    signupForm.DOB = this.convertDate(new Date(signupForm.DOB));

    this.registre
      .signUp(signupForm)
      .pipe(
        tap(() => this.goToApp()),
        tap(() => {
          const message = 'Welcome to app!';
          this.message.shomMessage(message);
        }),

        catchError((error: any) => {
          const message = 'The registration is cancelled';
          // const errorMessage = error.error.errors[0].params[0];
          this.message.shomMessage(message);
          this.router.navigate(['/signup']);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  private goToApp(): void {
    this.router.navigate(['/data']);
  }

  public onGoToOppositeForm() {
    this.router.navigate(['/signin']);
  }

  public onGoToAboutPage() {
    this.router.navigate(['/about']);
  }

  private convertDate(date: Date) {
    const dateString =
      new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0] + ' 00:00:00';

    return dateString;
  }
}
