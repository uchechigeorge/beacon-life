import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CurrencyOptions } from '../models/app-pages-model';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor() {}


  transform(value: string, currency?: Currency): string | SafeHtml {
    let valueNo = parseFloat(value).toFixed(2);
    value = valueNo.toString();
    const currencyType = this.setCurrency(currency);
    value = currencyType + value;
    return value;
  }

  private setCurrency(currency: Currency): string {
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
