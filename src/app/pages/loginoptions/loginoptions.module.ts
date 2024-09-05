import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginoptionsPageRoutingModule } from './loginoptions-routing.module';

import { LoginoptionsPage } from './loginoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginoptionsPageRoutingModule
  ],
  declarations: [LoginoptionsPage]
})
export class LoginoptionsPageModule {}
