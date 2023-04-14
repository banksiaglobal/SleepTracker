import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepsViewComponent } from '../sleeps-view/sleeps-view.component';

@Component({
  selector: 'app-sleeps',
  standalone: true,
  imports: [CommonModule, SleepsViewComponent],
  templateUrl: './sleeps.component.html',
  styleUrls: ['./sleeps.component.scss'],
})
export class SleepsComponent {}
