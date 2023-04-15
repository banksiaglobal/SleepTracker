import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepsViewComponent } from '../sleeps-view/sleeps-view.component';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { LoadingService } from 'src/app/share/services/loading.service';
import { MessagesService } from 'src/app/share/services/message.service';
import { SleepService } from 'src/app/share/services/sleep.service';

@Component({
  selector: 'app-sleeps',
  standalone: true,
  imports: [CommonModule, SleepsViewComponent],
  templateUrl: './sleeps.component.html',
  styleUrls: ['./sleeps.component.scss'],
})
export class SleepsComponent implements OnInit {
  public listSleeps$!: Observable<any[]>;
  constructor(
    private sleep: SleepService,
    private loadingService: LoadingService,
    private message: MessagesService
  ) {}
  ngOnInit(): void {
    this.listSleeps();
  }

  public listSleeps(): void {
    const listSleeps$ = this.sleep.allSleeps().pipe(
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
    this.listSleeps$ =
      this.loadingService.showSpinnerUntilCompleted(listSleeps$);
  }
}
