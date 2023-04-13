import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import { IUserAuth } from '../interfaces/auth';
import { IToken } from '../interfaces/token';
import { IUser } from '../interfaces/user';
import { token as mockToken, userGet } from '../../mock';
import { userGet as userGetMock } from '../../mock';

@Injectable({ providedIn: 'root' })
export class AuthService {
  router: any;
  constructor(
    private httpClient: HttpClient,
    private storage: LocalStorageService
  ) {}

  signIn(user: IUserAuth): Observable<IToken> {
    this.storage.saveTokens(mockToken.access_token);
    this.getCurrentUser();
    return of(mockToken);
  }

  // signIn(user: IUserAuth): Observable<IToken> {
  //   return this.httpClient.post<IToken>('/auth/sign-in', user).pipe(
  //     tap((response: IToken) => {
  //       this.storage.saveTokens(response.access_token);
  //     }),
  //     tap(() => this.getCurrentUser()),
  //     shareReplay()
  //   );
  // }

  // getCurrentUser(): Observable<IUserRegister> {
  //   return this.httpClient.post<IUserRegister>('/auth/user', null).pipe(
  //     tap((response: IUserRegister) => {
  // this.storage.saveUser(response);
  //       this.storage.saveUser(userGetMock.username);
  //     }),
  //     shareReplay()
  //   );
  // }
  getCurrentUser(): Observable<IUser> {
    this.storage.saveUser(userGetMock.username);
    return of(userGetMock);
  }

  public logout(): void {
    this.storage.clean();
    this.router.navigate(['/sign-in']);
  }

  public getToken(): string {
    return this.storage.getAccessToken();
  }

  public checkIsLogin {
    
  }
}
