import { Component, Input, OnInit } from '@angular/core';
import { CurrencyOptions } from 'src/app/models/app-pages-model';

@Component({
  selector: 'app-currency-type',
  templateUrl: './currency-type.component.html',
  styleUrls: ['./currency-type.component.scss'],
})
export class CurrencyTypeComponent implements OnInit {

  @Input() currency: Currency = 'naira';

  public currencyHTML = '';

  constructor() { }

  ngOnInit() {
    this.currencyHTML = this.setCurrency(this.currency);
  }

  setCurrency(currency: Currency): string {
    switch (currency) {
      case 'dollar':
        return CurrencyOptions.dollar.html;
      case 'naira':
        return CurrencyOptions.naira.html;
      case 'euro':
        return CurrencyOptions.euro.html;
      case 'pound':
        return CurrencyOptions.pound.html;
      default:
        return CurrencyOptions.naira.html;
    }
  } 
}

type Currency = 'dollar' | 'naira' | 'pound' | 'euro';
