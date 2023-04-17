import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/env';
import { ISleepSettings } from '../interfaces/sleep';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SleepService {
  constructor(
    private auth: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {}
  private api = 'http://sleeptracker.banksiaglobal.com:9000/';
  public addSleepSettings(settings: ISleepSettings): Observable<any> {
    return this.httpClient.post<any>(this.api + 'sleeps', settings).pipe(
      tap((response: ISleepSettings) => {
        response.id ? this.onGoToAdvice(response.id) : undefined;
      }),

      shareReplay()
    );
  }

  public changeSleepSettings(
    id: string,
    settings: ISleepSettings
  ): Observable<ISleepSettings> {
    return this.httpClient
      .put<ISleepSettings>(this.api + 'sleeps/' + id, settings)
      .pipe(
        tap((response: ISleepSettings) => {
          response.id ? this.onGoToAdvice(response.id) : undefined;
        }),

        shareReplay()
      );
  }

  public allSleeps(): Observable<any> {
    return this.httpClient.get<any>(this.api + 'sleeps').pipe(shareReplay());
  }

  public getSleepById(id: string): Observable<ISleepSettings> {
    return this.httpClient
      .get<ISleepSettings>(this.api + 'sleeps/' + id)
      .pipe(shareReplay());
  }

  public getSleepAdviceById(id: string): Observable<{ prediction: string }> {
    return this.httpClient
      .get<any>(this.api + 'sleeps/prediction/' + id)
      .pipe(shareReplay());
  }
  public onGoToAdvice(id: string) {
    this.router.navigate(['/advice', id]);
  }
}
