import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepViewComponent } from '../sleep-view/sleep-view.component';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SleepService } from 'src/app/share/services/sleep.service';
import { MessagesService } from 'src/app/share/services/message.service';
import { LoadingService } from 'src/app/share/services/loading.service';

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [CommonModule, SleepViewComponent],
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss'],
})
export class SleepComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sleep: SleepService,
    private message: MessagesService,
    private loading: LoadingService
  ) {}
  public sleep$!: Observable<ISleepSettings[]>;

  private sleepId: string;

  public currentsleep$!: Observable<ISleepSettings>;

  public currentAdvice$!: Observable<{ prediction: string }>;

  ngOnInit(): void {
    this.loadSleep();
  }

  private loadSleep(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.sleepId = id;
      this.getSleepById(this.sleepId);
      this.getSleepAdviceById(this.sleepId);
    } else this.router.navigate(['/about']);
  }

  private getSleepById(id: string): Observable<ISleepSettings> {
    const currentSleep$ = this.sleep.getSleepById(id).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        const message = 'Could not load any sleeps.';
        this.message.shomMessage(message, err);
        return throwError(() => err);
      })
    );

    this.currentsleep$ = this.loading.showSpinnerUntilCompleted(currentSleep$);
    return this.currentsleep$;
  }

  public onSaveSleepSettings(userSettings: ISleepSettings): void {
    if (userSettings) {
      const sleep$ = this.sleep.addSleepSettings(userSettings).pipe(
        tap(() => {
          const message = 'Ok! Your sleep was processed';
          this.message.shomMessage(message);
        }),
        catchError((error: any) => {
          const message = 'The sleep is cancelled';
          // const errorMessage = error.error.errors[0].params[0];
          this.message.shomMessage(message);
          return throwError(() => error);
        })
      );
      this.sleep$ = this.loading.showSpinnerUntilCompleted(sleep$);
    }
  }

  private getSleepAdviceById(id: string): Observable<{ prediction: string }> {
    const currentAdvice$ = this.sleep.getSleepAdviceById(id).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        const message = 'Could not load package.';
        this.message.shomMessage(message, err);
        return throwError(() => err);
      })
    );

    this.currentAdvice$ =
      this.loading.showSpinnerUntilCompleted(currentAdvice$);
    return this.currentAdvice$;
  }
}
