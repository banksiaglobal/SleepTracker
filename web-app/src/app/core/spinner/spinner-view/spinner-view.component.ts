import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-view',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-view.component.html',
  styleUrls: ['./spinner-view.component.scss'],
})
export class SpinnerViewComponent {
  @Input() loading: boolean | null;
}
