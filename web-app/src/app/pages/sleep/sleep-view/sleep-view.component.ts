import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';

@Component({
  selector: 'app-sleep-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sleep-view.component.html',
  styleUrls: ['./sleep-view.component.scss'],
})
export class SleepViewComponent {
  @Input() currentsleep: ISleepSettings | null;
}
