import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'comfortPipe', pure: true, standalone: true })
export class ComfortPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value) {
      switch (value) {
        case 1:
          return 'not bad';
        case 2:
          return 'ok';
        case 3:
          return 'absolutely comfortable';
      }
      return '';
    } else return '';
  }
}
