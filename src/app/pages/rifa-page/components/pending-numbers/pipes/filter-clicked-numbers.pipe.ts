import { Pipe, PipeTransform } from '@angular/core';
import { Numbers } from '../../../../../interfaces/rifa_interface';

@Pipe({
  name: 'filterClickedNumbers',
  standalone: true,
  pure: false,
})
export class FilterClickedNumbersPipe implements PipeTransform {
  transform(value: Numbers[]): Numbers[] {
    return value.filter((number) => number.clicked);
  }
}
