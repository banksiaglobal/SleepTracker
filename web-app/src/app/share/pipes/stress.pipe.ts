import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stressPipe', pure: true, standalone: true })
export class StressPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value) {
      switch (value) {
        case 1:
          return 'I am happy';
        case 2:
          return 'Not bad';
        case 3:
          return "Dangerous! I'm swamped";
      }
      return '';
    } else return '';
  }
}
