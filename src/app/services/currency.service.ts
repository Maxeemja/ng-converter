import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  filter,
  from,
  map, Observable,
  of,
  Subscription,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  toArray
} from "rxjs";
import {Currency} from "../interfaces/currency.interface";

interface Rates {
  [cc: string]: number
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  USD_RATE: number = 0;
  EUR_RATE: number = 0;

  rates: Rates = {};
  rates$: BehaviorSubject<Rates> = new BehaviorSubject<Rates>({})
  constructor(private http: HttpClient) {
  }

  getCurrencies(): void{
    this.http.get<Currency[]>(this.BASE_URL).pipe(
      tap(data => {
        data.map(currency => {
          this.rates[`${currency.cc}`] = currency.rate;
        })
        this.EUR_RATE = this.rates['EUR'];
        this.USD_RATE = this.rates['USD'];
      })
    )
    .subscribe((_) => {
      this.rates$.next(this.rates)
    })
  }

  convert(firstValue: number, firstCurrency: string, secCurrency: string): number {
    let result = 0;
    if(firstCurrency === secCurrency) return firstValue;
    switch(firstCurrency){
      case 'UAH':
        if(secCurrency === 'USD') result = firstValue / this.USD_RATE;
        else if (secCurrency === 'EUR') result = firstValue / this.EUR_RATE;
        break;
      case 'USD':
        if(secCurrency === 'UAH') result = firstValue * this.USD_RATE;
        else if (secCurrency === 'EUR') result = firstValue * (this.USD_RATE / this.EUR_RATE);
        break;
      case 'EUR':
        if(secCurrency === 'UAH') result = firstValue * this.EUR_RATE;
        else if (secCurrency === 'USD') result = firstValue * (this.EUR_RATE / this.USD_RATE);
        break;
    }
    return +result.toFixed(2);
  }


}
