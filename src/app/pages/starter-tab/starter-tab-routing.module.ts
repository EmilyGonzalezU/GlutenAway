import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarterTabPage } from './starter-tab.page';

const routes: Routes = [
  {
    path: '',
    component: StarterTabPage,
    children:[
      {
        path: 'recipes',
        loadChildren: () => import('./../../pages/recipes/recipes.module').then( m => m.RecipesPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('./../../pages/scanner/scanner.module').then( m => m.ScannerPageModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./../../pages/maps/maps.module').then( m => m.MapsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarterTabPageRoutingModule {}
