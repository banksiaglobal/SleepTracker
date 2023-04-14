import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-collect-data-form',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
  ],

  templateUrl: './collect-data-form.component.html',
  styleUrls: ['./collect-data-form.component.scss'],
})
export class CollectDataFormComponent {
  @Output() onSaveSleepSettings = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  public hide = true;

  addInfoForm = this.fb.group({
    activity: ['medium', [Validators.required]],
    coffee: ['1', [Validators.required]],
    comfort: ['1', [Validators.required]],
    stress: ['1', [Validators.required]],
    emotion: ['2', [Validators.required]],
    light: ['1', [Validators.required]],
    bedtime: ['', [Validators.required]],
    wakeup: ['', [Validators.required]],
    sleep: ['1', [Validators.required]],
  });

  public submitForm(): void {
    this.onSaveSleepSettings.emit(this.addInfoForm.value);
  }
}
