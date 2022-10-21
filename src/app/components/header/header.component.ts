import {Component} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  rates$ = this.service.rates$;

  constructor(private service: CurrencyService) {
  }

}
