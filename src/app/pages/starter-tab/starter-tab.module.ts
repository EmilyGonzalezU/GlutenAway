import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarterTabPageRoutingModule } from './starter-tab-routing.module';

import { StarterTabPage } from './starter-tab.page';
import { RecipesComponent } from 'src/app/components/recipes/recipes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarterTabPageRoutingModule
  ],
  declarations: [StarterTabPage, RecipesComponent]
})
export class StarterTabPageModule {}
