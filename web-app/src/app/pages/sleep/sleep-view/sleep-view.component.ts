import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';

@Component({
  selector: 'app-sleep-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sleep-view.component.html',
  styleUrls: ['./sleep-view.component.scss'],
})
export class SleepViewComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.currentsleep);
  }
  @Input() currentsleep: ISleepSettings | null;
}
