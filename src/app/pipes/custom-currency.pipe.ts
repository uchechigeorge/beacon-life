import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CurrencyOptions } from '../models/app-pages-model';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor() {}


  transform(value: string, currency?: Currency, excludeSymbol?: boolean): string | SafeHtml {
    value = this.addComma(value);
    const currencyType = this.setCurrency(currency);
    if(excludeSymbol) return value;
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

  addComma(value?: string) {
    let initValue = value;
    initValue = initValue.replace(/,/g, '');
    let initValueNo = parseFloat(initValue);
    initValue = initValueNo.toFixed(2).toString();
    let wholeNumber = initValue.replace(/\.[0-9]+/, '');
    let decimalNumber = initValue.replace(wholeNumber, '');
    let wholeNumberArray: string[] = wholeNumber.split('');
    let decimalArray: string[] = decimalNumber.split('');
    let wholeNoModifiedArray: string[] = [];

    wholeNumberArray = wholeNumberArray.reverse();
    wholeNumberArray.forEach((value, i) => {
      if(isNaN(parseInt(value))) return;
      wholeNoModifiedArray.push(value);
        if((( i + 1 ) % 3 ) == 0) {
        wholeNoModifiedArray.push(',');
      }
    });

    wholeNoModifiedArray = wholeNoModifiedArray.reverse().concat(decimalArray);

    initValue = wholeNoModifiedArray.join('');
    initValue = initValue.replace(/^,/, '');

    return initValue;
  }
}

type Currency = 'dollar' | 'naira' | 'pound' | 'euro';
