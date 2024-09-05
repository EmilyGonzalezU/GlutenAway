import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginoptionsPage } from './loginoptions.page';

const routes: Routes = [
  {
    path: '',
    component: LoginoptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginoptionsPageRoutingModule {}
