import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectDataFormComponent } from '../collect-data-form/collect-data-form.component';

@Component({
  selector: 'app-collect-data-view',
  standalone: true,
  imports: [CommonModule, CollectDataFormComponent],
  templateUrl: './collect-data-view.component.html',
  styleUrls: ['./collect-data-view.component.scss'],
})
export class CollectDataViewComponent {
  @Output() addData = new EventEmitter<any>();
}
