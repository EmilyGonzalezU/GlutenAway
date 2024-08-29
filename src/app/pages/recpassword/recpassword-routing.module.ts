import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecpasswordPage } from './recpassword.page';

const routes: Routes = [
  {
    path: '',
    component: RecpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecpasswordPageRoutingModule {}
