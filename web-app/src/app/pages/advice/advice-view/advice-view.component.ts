import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-advice-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './advice-view.component.html',
  styleUrls: ['./advice-view.component.scss'],
})
export class AdviceViewComponent {
  ngOnInit(): void {
    console.log(this.currentAdvice?.prediction, this.currentsleep);
  }
  @Input() currentAdvice: { prediction: string } | null;

  @Input() currentsleep: ISleepSettings | null;
}
