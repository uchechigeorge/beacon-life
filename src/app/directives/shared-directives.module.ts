import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNumberInputDirective } from './card-number-input.directive';
import { CardExpiryDateInputDirective } from './card-expiry-date-input.directive';
import { CurrencyInputDirective } from './currency-input.directive';



@NgModule({
  declarations: [
    CardNumberInputDirective,
    CardExpiryDateInputDirective,
    CurrencyInputDirective,
  ],
  exports: [
    CardNumberInputDirective,
    CardExpiryDateInputDirective,
    CurrencyInputDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
