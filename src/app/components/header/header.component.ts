import {Component, OnInit} from '@angular/core';
import {Currency} from "../../interfaces/currency.interface";
import {CurrencyService} from "../../services/currency.service";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  rates$ = this.service.rates$;
  constructor(private service: CurrencyService) {
  }

}
