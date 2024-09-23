import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
<<<<<<< Updated upstream
    redirectTo: 'login',
=======
    redirectTo: "",
>>>>>>> Stashed changes
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'recpassword',
    loadChildren: () => import('./pages/recpassword/recpassword.module').then( m => m.RecpasswordPageModule)
  },
<<<<<<< Updated upstream
=======
  {
    path: 'starter-tab',
    loadChildren: () => import('./pages/starter-tab/starter-tab.module').then( m => m.StarterTabPageModule)
  },
  {
    path: 'loginoptions',
    loadChildren: () => import('./pages/loginoptions/loginoptions.module').then( m => m.LoginoptionsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  }



>>>>>>> Stashed changes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
