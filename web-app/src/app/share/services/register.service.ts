import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { IUserRegister } from '../interfaces/register';
import { IToken } from '../interfaces/token';
import { LocalStorageService } from './localStorage.service';
import { AuthService } from './auth.service';
import { token as mockToken, userGet } from '../../mock';
import { userGet as userGetMock } from '../../mock';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(
    private storage: LocalStorageService,
    private auth: AuthService
  ) {}

  // signUp(user: IUserRegister): Observable<IToken> {
  //   return this.httpClient.post<IToken>('/auth/sign-up', user).pipe(
  //     tap((response: IToken) => {
  // this.storage.saveTokens(response.access_token);
  //     }),
  //     tap(() => this.auth.getCurrentUser()),
  //     shareReplay()
  //   );
  // }

  signUp(user: IUserRegister): Observable<IToken> {
    // this.storage.saveTokens(response.access_token);
    this.storage.saveTokens(mockToken.access_token);
    this.auth.getCurrentUser();
    return of(mockToken);
  }
}
