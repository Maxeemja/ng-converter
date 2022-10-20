import {Component} from '@angular/core';
import {CurrencyService} from "./services/currency.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tech-task';

  constructor(private service: CurrencyService) {
  }

  ngOnInit(): void {
    this.service.getCurrencies()
  }
}
