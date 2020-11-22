import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteSignupPage } from './complete-signup.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteSignupPageRoutingModule {}
