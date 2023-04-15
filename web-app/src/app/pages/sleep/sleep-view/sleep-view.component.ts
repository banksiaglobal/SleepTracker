import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { MatCardModule } from '@angular/material/card';
import { CoffeePipe } from 'src/app/share/pipes/coffee.pipe';
import { ComfortPipe } from 'src/app/share/pipes/comfort.Pipe';
import { EmotionPipe } from 'src/app/share/pipes/emotion.pipe';
import { SonPipe } from 'src/app/share/pipes/quality.pipe';
import { StressPipe } from 'src/app/share/pipes/stress.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-sleep-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CoffeePipe,
    ComfortPipe,
    EmotionPipe,
    SonPipe,
    StressPipe,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './sleep-view.component.html',
  styleUrls: ['./sleep-view.component.scss'],
})
export class SleepViewComponent {
  constructor(private fb: FormBuilder) {}
  @Input() currentsleep: ISleepSettings | null;

  @Output() onSaveSleepSettings = new EventEmitter<any>();

  @Input() sleep: any[] | null;

  public changeSleep = false;
  public addInfoForm: any;

  public update: any;

  public changeDataSleep() {
    if (this.currentsleep !== undefined) {
      this.changeSleep = true;
      this.addInfoForm = this.fb.group({
        activity: [this.currentsleep?.activity, [Validators.required]],
        coffee: [String(this.currentsleep?.coffee), [Validators.required]],
        comfort: [String(this.currentsleep?.comfort), [Validators.required]],
        stress: [String(this.currentsleep?.stress), [Validators.required]],
        emotion: [String(this.currentsleep?.emotion), [Validators.required]],
        light: [String(this.currentsleep?.lights), [Validators.required]],
        start_time: [`22:00`, [Validators.required]],
        start_day: ['', [Validators.required]],
        end_time: [`06:00`, [Validators.required]],
        end_day: ['', [Validators.required]],
        quality: [String(this.currentsleep?.quality), [Validators.required]],
      });
    }
  }

  submitForm() {
    const dayBefore = this.convertDate(
      new Date(this.addInfoForm.value.start_day)
    );
    const today = this.convertDate(new Date(this.addInfoForm.value.end_day));
    const startTime = this.addInfoForm.value.start_time + ':00';

    const endTime = this.addInfoForm.value.end_time + ':00';

    const update = {
      start_time: `${dayBefore} ${startTime}`,
      end_time: `${today} ${endTime}`,
      activity: this.addInfoForm.value.activity,
      coffee: this.addInfoForm.value.coffee,
      comfort: this.addInfoForm.value.comfort,
      stress: this.addInfoForm.value.stress,
      emotion: this.addInfoForm.value.emotion,
      light:  this.addInfoForm.value.light,
      quality:  this.addInfoForm.value.quality,
    };
    this.onSaveSleepSettings.emit(update);
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
