import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sonPipe', pure: true, standalone: true })
export class SonPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value) {
      switch (value) {
        case 1:
          return 'Is it all? I want to sleep';
        case 2:
          return 'I am ok';
        case 3:
          return 'Wooow! The world is mine!';
      }
      return '';
    } else return '';
  }
}
