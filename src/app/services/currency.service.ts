import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Currency} from "../interfaces/currency.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  data$: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([])

  constructor(private http: HttpClient) {
  }

  getCurrencies() {
    return this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').pipe(
      map((data: Currency[]) => data.filter(currency => currency.cc == 'EUR' || currency.cc == 'USD')),
    ).subscribe((data) => this.data$.next(data))
  }
}
