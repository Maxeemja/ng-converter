import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Subscription, tap, toArray} from "rxjs";
import {Currency} from "../interfaces/currency.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  data$: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([])
  USD_RATE: number = 0;
  EUR_RATE: number = 0;


  constructor(private http: HttpClient) {
  }

  getCurrencies() : Subscription {
    return this.http.get<Currency[]>(this.BASE_URL).pipe(
      map((data: Currency[]) => data.filter(currency => currency.cc == 'EUR' || currency.cc == 'USD')),
      tap((data: Currency[]) => {
        this.EUR_RATE = data[1].rate;
        this.USD_RATE = data[0].rate;
      }),
    ).subscribe((data) => this.data$.next(data))
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
