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
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

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
    MatDatepickerModule,
    MatNativeDateModule,
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
    emotion: ['1', [Validators.required]],
    light: ['1', [Validators.required]],
    start_time: [`22:00`, [Validators.required]],
    start_day: [`${new Date(year, month, day - 1)}`, [Validators.required]],
    end_time: [`06:00`, [Validators.required]],
    end_day: [`${new Date(year, month, day)}`, [Validators.required]],
    quality: ['1', [Validators.required]],
  });

  public submitForm(): void {
    if (this.addInfoForm.value.start_day && this.addInfoForm.value.end_day) {
      const dayBefore = this.convertDate(
        new Date(this.addInfoForm.value.start_day)
      );
      const today = this.convertDate(new Date(this.addInfoForm.value.end_day));
      const startTime = this.addInfoForm.value.start_time + ':00';

      const endTime = this.addInfoForm.value.end_time + ':00';

      const userSleep = {
        start_time: `${dayBefore} ${startTime}`,
        end_time: `${today} ${endTime}`,
        activity: this.addInfoForm.value.activity,
        coffee: Number(this.addInfoForm.value.coffee),
        comfort: Number(this.addInfoForm.value.comfort),
        emotion: Number(this.addInfoForm.value.emotion),
        lights: Number(this.addInfoForm.value.light),
        stress: Number(this.addInfoForm.value.stress),
        quality: Number(this.addInfoForm.value.quality),
      };
      console.log(userSleep);
      this.onSaveSleepSettings.emit(userSleep);
    }
  }

  private convertDate(date: Date): string {
    const dateString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    return dateString;
  }
}
