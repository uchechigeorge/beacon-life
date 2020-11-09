import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){ }


  transform(value: string, ...args: unknown[]): SafeHtml {
    // let currencyString = args[0] as string;
    // // currencyString = `<span>23</span>`;
    // let currency = this.sanitizer.bypassSecurityTrustHtml(currencyString);
    // console.log(currencyString);
    return this.sanitizer.bypassSecurityTrustHtml(value);

    // return `${currency} ${value}`;
  }

}
