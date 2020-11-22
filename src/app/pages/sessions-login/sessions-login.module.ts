import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionsLoginPageRoutingModule } from './sessions-login-routing.module';

import { SessionsLoginPage } from './sessions-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionsLoginPageRoutingModule
  ],
  declarations: [SessionsLoginPage]
})
export class SessionsLoginPageModule {}
