import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SanitizerPipe } from 'src/app/pipes/sanitizer.pipe';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    SharedPipesModule,
  ],
  declarations: [HomePage],
  providers: [
    SanitizerPipe,
    CustomCurrencyPipe,
  ]
})
export class HomePageModule {}
