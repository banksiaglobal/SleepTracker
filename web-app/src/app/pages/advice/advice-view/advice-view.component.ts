import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-advice-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './advice-view.component.html',
  styleUrls: ['./advice-view.component.scss'],
})
export class AdviceViewComponent {
  @Input() currentAdvice: { prediction: string } | null;

  @Input() currentsleep: ISleepSettings | null;

  @Output() onSleepPage = new EventEmitter<any>();

  public goToSleep() {
    this.onSleepPage.emit(this.currentsleep);
  }
}
