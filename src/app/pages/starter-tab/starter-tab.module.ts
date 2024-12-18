import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarterTabPageRoutingModule } from './starter-tab-routing.module';

import { StarterTabPage } from './starter-tab.page';
import { AddNewRecipeComponent } from 'src/app/components/add-new-recipe/add-new-recipe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarterTabPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [StarterTabPage, AddNewRecipeComponent]
})
export class StarterTabPageModule {}
