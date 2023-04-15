import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'emotionPipe', pure: true, standalone: true })
export class EmotionPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value) {
      switch (value) {
        case 1:
          return 'no';
        case 2:
          return 'yes';
      }
      return '';
    } else return '';
  }
}
