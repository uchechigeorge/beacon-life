import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { signInRoute, signUpRoute } from './models/route-models';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
    path: '**',
    redirectTo: signUpRoute
  }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
