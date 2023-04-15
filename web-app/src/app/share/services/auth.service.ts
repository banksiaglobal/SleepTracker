import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { IUserAuth } from '../interfaces/auth';
import { IToken } from '../interfaces/token';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { environment } from 'src/environment/env';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<string>('');

  public user$: Observable<string> = this.user.asObservable();

  public isLoggedIn$: Observable<boolean>;

  public isLoggedOut$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    const user = this.storage.getUser();
    console.log(user);
    if (user) {
      this.user.next(user);
    }
  }

  signIn(user: IUserAuth): Observable<IToken> {
    return this.httpClient
      .post<IToken>(environment.apiUrl + 'auth/sign-in', user)
      .pipe(
        tap((response: IToken) => {
          this.storage.saveTokens(response.access_token);
        }),
        tap(() => this.getCurrentUser().subscribe()),

        shareReplay()
      );
  }

  getCurrentUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(environment.apiUrl + 'auth/user').pipe(
      tap((response: IUser) => {
        this.storage.saveUser(response.username);
        this.user.next(response.username);
        this.goToApp();
      }),
      shareReplay()
    );
  }

  public logout(): void {
    this.storage.clean();
    this.user.next('');
    this.router.navigate(['/signin']);
  }

  private goToApp(): void {
    this.router.navigate(['/sleeps']);
  }

  public getToken(): string {
    return this.storage.getAccessToken();
  }
}
