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
import { environment } from '../environments/environment'; // Asegúrate de importar el entorno
import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
  //Fire base providers
  declarations: [AppComponent, ScannerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,provideFirebaseApp(() => initializeApp(environment.firebaseConfig )),
    provideFirestore(() => getFirestore()),provideAuth(() => getAuth()),
  ],
  

  
  bootstrap: [AppComponent],
})
export class AppModule {}
