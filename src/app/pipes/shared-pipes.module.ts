import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer.pipe';
import { CustomCurrencyPipe } from './custom-currency.pipe';



@NgModule({
  declarations: [
    CustomCurrencyPipe,
    SanitizerPipe
  ],
  exports: [
    SanitizerPipe,
    CustomCurrencyPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedPipesModule { }
