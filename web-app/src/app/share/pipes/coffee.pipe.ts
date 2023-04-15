import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'coffeePipe', pure: true, standalone: true })
export class CoffeePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value) {
      switch (value) {
        case 1:
          return '0 - 1';
        case 2:
          return '2 - 3';
        case 3:
          return '> 3';
      }
      return '';
    } else return '';
  }
}
