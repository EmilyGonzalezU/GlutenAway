import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScannerComponent } from './components/scanner/scanner.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment'; 
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SettingsComponent } from './components/settings/settings.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { MapsComponent } from './components/maps/maps.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { MyrecipesComponent } from './components/myrecipes/myrecipes.component';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
@NgModule({
  //Fire base providers
  declarations: [AppComponent, ScannerComponent, RecipesComponent, SettingsComponent, MapsComponent, FavoriteComponent, MyrecipesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,provideFirebaseApp(() => initializeApp(environment.firebaseConfig )),
    provideFirestore(() => getFirestore()),provideAuth(() => getAuth()), EmailComposer
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
