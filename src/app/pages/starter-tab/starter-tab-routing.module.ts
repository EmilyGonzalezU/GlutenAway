import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarterTabPage } from './starter-tab.page';
import { MapsComponent } from 'src/app/components/maps/maps.component';
import { RecipesComponent } from 'src/app/components/recipes/recipes.component';
import { ScannerComponent } from 'src/app/components/scanner/scanner.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: StarterTabPage,
    children:[
      {
        path: 'recipes',
        component : RecipesComponent
      },
      {
        path: 'scanner',
        component : ScannerComponent
      },
      {
        path: 'maps',
        component: MapsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarterTabPageRoutingModule {}
