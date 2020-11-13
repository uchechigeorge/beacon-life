import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SanitizerPipe } from 'src/app/pipes/sanitizer.pipe';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    SanitizerPipe,
    CustomCurrencyPipe,
  ]
})
export class HomePageModule {}
