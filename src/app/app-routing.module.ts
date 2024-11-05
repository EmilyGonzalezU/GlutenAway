import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';  

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    , canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
    , canActivate: [AuthGuard],
  },
  {
    path: 'recpassword',
    loadChildren: () => import('./pages/recpassword/recpassword.module').then(m => m.RecpasswordPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'starter-tab',
    loadChildren: () => import('./pages/starter-tab/starter-tab.module').then(m => m.StarterTabPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'loginoptions',
    loadChildren: () => import('./pages/loginoptions/loginoptions.module').then(m => m.LoginoptionsPageModule)
    ,canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
    , canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
