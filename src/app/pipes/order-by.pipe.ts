import { Pipe, PipeTransform } from '@angular/core';
import {Currency} from "../interfaces/currency.interface";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<Currency>): Array<Currency> {
    array.sort((a: Currency, b: Currency) => {
      if (a.cc === 'UAH' || a.cc === 'USD' || a.cc === 'EUR') {
        return -1;
      } else {
        return 1;
      }
    });
    return array;
  }

}
