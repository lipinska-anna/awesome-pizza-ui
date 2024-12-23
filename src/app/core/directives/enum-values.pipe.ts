import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'enumValues'
})
export class EnumValuesPipe implements PipeTransform {

  transform(enumObj: object): any[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key))) // Filter out numeric keys (if the enum is numeric)
  }

}
