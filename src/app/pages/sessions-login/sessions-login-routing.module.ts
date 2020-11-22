import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionsLoginPage } from './sessions-login.page';

const routes: Routes = [
  {
    path: '',
    component: SessionsLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsLoginPageRoutingModule {}
