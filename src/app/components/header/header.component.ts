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
  data$: Observable<Currency[]> = this.service.data$;
  constructor(private service: CurrencyService) { }

}
