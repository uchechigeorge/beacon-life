import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { signInRoute, signUpRoute, completeSignUpRoute, sessionsLoginRoute } from './models/route-models';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: signUpRoute,
    loadChildren: () => import('./pages/user-auth/user-auth.module').then( m => m.UserAuthPageModule)
  },
  {
    path: signInRoute,
    loadChildren: () => import('./pages/user-auth/user-auth.module').then( m => m.UserAuthPageModule)
  },
  {
    path: completeSignUpRoute,
    loadChildren: () => import('./pages/complete-signup/complete-signup.module').then( m => m.CompleteSignupPageModule),
  },
  {
    path: sessionsLoginRoute,
    loadChildren: () => import('./pages/sessions-login/sessions-login.module').then( m => m.SessionsLoginPageModule)
  },
  {
    path: '**',
    redirectTo: signUpRoute
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
