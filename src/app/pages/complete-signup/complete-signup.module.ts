import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteSignupPageRoutingModule } from './complete-signup-routing.module';

import { CompleteSignupPage } from './complete-signup.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteSignupPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CompleteSignupPage]
})
export class CompleteSignupPageModule {}
