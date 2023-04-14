import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectDataViewComponent } from '../collect-data-view/collect-data-view.component';

@Component({
  selector: 'app-collect-data',
  standalone: true,
  imports: [CommonModule, CollectDataViewComponent],
  templateUrl: './collect-data.component.html',
  styleUrls: ['./collect-data.component.scss'],
})
export class CollectDataComponent {
  public onSaveSleepSettings(userSettings: any): void {
    if (userSettings) {
      console.log(userSettings);
    }
  }
}
