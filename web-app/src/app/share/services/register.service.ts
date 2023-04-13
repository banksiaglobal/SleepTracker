import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IUserRegister } from '../interfaces/register';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  signUp(user: IUserRegister): Observable<IUserRegister> {
    return this.httpClient
      .post<IUserRegister>('/auth/sign-up', user)
      .pipe(shareReplay());
  }
}
