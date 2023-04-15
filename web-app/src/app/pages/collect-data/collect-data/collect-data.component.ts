import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectDataViewComponent } from '../collect-data-view/collect-data-view.component';
import { SleepService } from 'src/app/share/services/sleep.service';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MessagesService } from 'src/app/share/services/message.service';
import { LoadingService } from 'src/app/share/services/loading.service';

@Component({
  selector: 'app-collect-data',
  standalone: true,
  imports: [CommonModule, CollectDataViewComponent],
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss'],
})
export class CollectDataComponent {
  public sleep$!: Observable<ISleepSettings[]>;
  constructor(
    private sleep: SleepService,
    private loadingService: LoadingService,
    private message: MessagesService
  ) {}

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
      this.sleep$ = this.loadingService.showSpinnerUntilCompleted(sleep$);
    }
  }
}
