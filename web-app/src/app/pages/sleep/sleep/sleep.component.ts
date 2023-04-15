import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepViewComponent } from '../sleep-view/sleep-view.component';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { Observable, catchError, map, throwError } from 'rxjs';
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

  private sleepId: string;

  public currentsleep$!: Observable<ISleepSettings>;

  ngOnInit(): void {
    this.loadSleep();
  }

  private loadSleep(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.sleepId = id;
      this.getSleepById(this.sleepId);
    } else this.router.navigate(['/packages']);
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
