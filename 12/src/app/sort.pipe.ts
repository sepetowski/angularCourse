import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform<T>(array: T[], sortByPropertyName: string) {
    const newArray = array.sort((a, b) =>
      a[sortByPropertyName].localeCompare(b[sortByPropertyName])
    );

    return newArray;
  }
}
