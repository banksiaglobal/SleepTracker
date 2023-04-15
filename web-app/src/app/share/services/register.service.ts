import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay, tap } from 'rxjs';
import { IUserRegister } from '../interfaces/register';
import { IToken } from '../interfaces/token';
import { LocalStorageService } from './localStorage.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/env';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  public user = new BehaviorSubject<string>('');

  public user$: Observable<string> = this.user.asObservable();

  public isLoggedIn$: Observable<boolean>;

  public isLoggedOut$: Observable<boolean>;

  constructor(
    private storage: LocalStorageService,
    private auth: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    const user = this.storage.getUser();

    if (user) {
      this.user.next(user);
    }
  }

  signUp(user: IUserRegister): Observable<IToken> {
    return this.httpClient
      .post<IToken>(environment.apiUrl + 'auth/sign-up', user)
      .pipe(
        tap((response: IToken) => {
          this.storage.saveTokens(response.access_token);
        }),
        tap(() => this.auth.getCurrentUser().subscribe()),
        tap(() => this.goToApp()),
        shareReplay()
      );
  }

  private goToApp(): void {
    console.log('go to app');
    this.router.navigate(['/sleep']);
  }
}
