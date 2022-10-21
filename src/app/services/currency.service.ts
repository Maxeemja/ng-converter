import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  map,
  tap
} from "rxjs";
import {Currency} from "../interfaces/currency.interface";
import {Rates} from "../interfaces/rates.interface";
import {Form, FormGroup} from "@angular/forms";
import {emit} from "cluster";

interface Values {
  firstValue: number,
  secValue: number,
  firstCurrency: string,
  secCurrency: string
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  USD_RATE!: number;
  EUR_RATE!: number;

  rates: Rates = {};
  data$: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([])
  rates$: BehaviorSubject<Rates> = new BehaviorSubject<Rates>({})

  constructor(private http: HttpClient) {
  }

  getCurrencies(): void {
    this.http.get<Currency[]>(this.BASE_URL).pipe(
      map(data => {
        return [{cc: 'UAH', rate: 1}, ...data]
      }),
      tap(data => {
        data.map(currency => {
          this.rates[`${currency.cc}`] = currency.rate;
        })
        this.EUR_RATE = this.rates['EUR'];
        this.USD_RATE = this.rates['USD'];
      })
    )
      .subscribe((data) => {
        this.data$.next(data);
        this.rates$.next(this.rates);
      })
  }
}
