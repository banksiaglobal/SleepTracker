import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/env';
import { ISleepSettings } from '../interfaces/sleep';

@Injectable({ providedIn: 'root' })
export class SleepService {
  constructor(private auth: AuthService, private httpClient: HttpClient) {}

  public addSleepSettings(settings: ISleepSettings): Observable<any> {
    return this.httpClient
      .post<any>(environment.apiUrl + 'sleeps', settings)
      .pipe(
        tap((response: any) => {
          console.log(response);
        }),

        shareReplay()
      );
  }
}
