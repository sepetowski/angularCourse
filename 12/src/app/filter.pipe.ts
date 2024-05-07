import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // recalcualte pipe whenever data chamhes - better not to use it can lead to parformance issues
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: string[], filterString: string, propName: string) {
    if (value.length === 0) {
      return value;
    }
    const result: string[] = [];
    for (const item of value) {
      if (item[propName].includes(filterString)) {
        result.push(item);
      }
    }
    return result;
  }
}
