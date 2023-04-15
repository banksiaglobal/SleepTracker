import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviceViewComponent } from '../advice-view/advice-view.component';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { MessagesService } from 'src/app/share/services/message.service';
import { SleepService } from 'src/app/share/services/sleep.service';
import { LoadingService } from 'src/app/share/services/loading.service';

@Component({
  selector: 'app-advice',
  standalone: true,
  imports: [CommonModule, AdviceViewComponent],
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
})
export class AdviceComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sleep: SleepService,
    private message: MessagesService,
    private loading: LoadingService
  ) {}
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
      this.getSleepAdviceById(this.sleepId);
      this.getSleepById(this.sleepId);
    } else this.router.navigate(['/packages']);
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

  private getSleepById(id: string): Observable<ISleepSettings> {
    const currentSleep$ = this.sleep.getSleepById(id).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        const message = 'Could not load package.';
        this.message.shomMessage(message, err);
        return throwError(() => err);
      })
    );

    this.currentsleep$ = this.loading.showSpinnerUntilCompleted(currentSleep$);
    return this.currentsleep$;
  }
}
