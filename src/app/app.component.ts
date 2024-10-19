import { Component, inject } from '@angular/core';
import { SharedService } from './shared.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [SharedService]
})
export class AppComponent {
  items$: Observable<any[]>;

  constructor(
    private firestore: Firestore, 
    private auth: Auth, 
    private router: Router
  ) {
    const itemsCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(itemsCollection);

    this.initializeApp();
  }

  initializeApp() {
    this.auth.onAuthStateChanged((user) => {
      //Metodo authStateChanged es el metodo de validacion de firebase
      //aca identifica si el usuario esta logeado con firebase o goole
      if (user) {
        console.log('logueado con firebase');
        this.router.navigate(['/starter-tab']);
      } else {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          console.log('logueado con google');
          this.router.navigate(['/starter-tab']);
        } else {
          console.log('usuario no logueado');
          this.router.navigate(['/loginoptions']);
        }
      }
    });
  }
  
}
