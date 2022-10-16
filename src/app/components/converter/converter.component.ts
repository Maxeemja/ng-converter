import {Component} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  firstInput!: number;
  secondInput!: number;
  firstSelect: string = 'UAH';
  secondSelect: string = 'USD';
  constructor(private service: CurrencyService) {
  }

  handleInputChange(name: string = 'first') {
    if(name == 'first') {
      this.secondInput = this.service.convert(this.firstInput, this.firstSelect, this.secondSelect);
    } else {
      this.firstInput = this.service.convert(this.secondInput, this.secondSelect, this.firstSelect);
    }
  }

  handleSelectChange() {
    this.secondInput = this.service.convert(this.firstInput, this.firstSelect, this.secondSelect);
    this.firstInput = this.service.convert(this.secondInput, this.secondSelect, this.firstSelect);
  }
}
