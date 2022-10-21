import {Component} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  form: FormGroup;
  data$ = this.service.data$;

  constructor(private service: CurrencyService, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstValue: '',
      secValue: '',
      firstCurrency: 'UAH',
      secCurrency: 'USD'
    })
    this.onChanges();
  }

  get firstValue() {
    return this.form.get('firstValue')
  }

  get secValue() {
    return this.form.get('secValue')
  }

  get firstCurrency() {
    return this.form.get('firstCurrency')
  }

  get secCurrency() {
    return this.form.get('secCurrency')
  }

  onChanges() {
    this.firstValue.valueChanges.pipe().subscribe(val => {
      const {firstCurrency, secCurrency} = this.form.value;
      let res = val * (this.service.rates[firstCurrency] / this.service.rates[secCurrency])
      this.secValue.setValue(res, {emitEvent: false})
    })
    this.secValue.valueChanges.subscribe(val => {
      const {firstCurrency, secCurrency} = this.form.value;
      let res = val * (this.service.rates[secCurrency] / this.service.rates[firstCurrency])
      this.firstValue.setValue(res, {emitEvent: false})
    })
    this.firstCurrency.valueChanges.subscribe(newCurr => {
      const {firstValue, secCurrency} = this.form.value;
      let res = firstValue * (this.service.rates[newCurr] / this.service.rates[secCurrency])
      this.secValue.setValue(res, {emitEvent: false})
    })
    this.secCurrency.valueChanges.subscribe(newCurr => {
      const {secValue, firstCurrency} = this.form.value;
      let res = secValue * (this.service.rates[newCurr] / this.service.rates[firstCurrency])
      this.firstValue.setValue(res, {emitEvent: false})
    })
  }

}
