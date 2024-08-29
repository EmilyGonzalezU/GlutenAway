import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecpasswordPageRoutingModule } from './recpassword-routing.module';

import { RecpasswordPage } from './recpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecpasswordPageRoutingModule
  ],
  declarations: [RecpasswordPage]
})
export class RecpasswordPageModule {}
