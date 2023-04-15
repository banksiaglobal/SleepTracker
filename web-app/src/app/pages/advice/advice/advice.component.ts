import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviceViewComponent } from '../advice-view/advice-view.component';

@Component({
  selector: 'app-advice',
  standalone: true,
  imports: [CommonModule, AdviceViewComponent],
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
})
export class AdviceComponent {}
