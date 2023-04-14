import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { IUserRegister } from '../interfaces/register';
import { IToken } from '../interfaces/token';
import { AuthService } from './auth.service';
import { token as mockToken, userGet } from '../../mock';
import { userGet as userGetMock } from '../../mock';
import { ISleepSettings } from '../interfaces/sleep';
import { environment } from 'src/environment/env';

@Injectable({ providedIn: 'root' })
export class SleepService {
  constructor(private auth: AuthService, private httpClient: HttpClient) {}

  // signUp(user: IUserRegister): Observable<IToken> {
  //   return this.httpClient.post<IToken>('/auth/sign-up', user).pipe(
  //     tap((response: IToken) => {
  // this.storage.saveTokens(response.access_token);
  //     }),
  //     tap(() => this.auth.getCurrentUser()),
  //     shareReplay()
  //   );
  // }

  addSleepSettings(settings: ISleepSettings): Observable<any> {
    return this.httpClient
      .post<any>(environment.apiUrl + 'condition', settings)
      .pipe(
        tap((response: any) => {
          console.log(response);
        }),

        shareReplay()
      );
  }
}
