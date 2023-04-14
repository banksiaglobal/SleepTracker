import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectDataViewComponent } from '../collect-data-view/collect-data-view.component';
import { SleepService } from 'src/app/share/services/sleep.service';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';

@Component({
  selector: 'app-collect-data',
  standalone: true,
  imports: [CommonModule, CollectDataViewComponent],
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss'],
})
export class CollectDataComponent {
  constructor(private sleep: SleepService) {}
  public onSaveSleepSettings(userSettings: ISleepSettings): void {
    if (userSettings) {
      console.log(userSettings);
      this.sleep.addSleepSettings(userSettings).subscribe();
    }
  }
}
