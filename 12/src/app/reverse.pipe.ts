import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: string) {
    const arrayOfChars = value.split('');
    return arrayOfChars.reverse().join('');
  }
}
