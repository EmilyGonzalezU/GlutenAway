import { Component, inject } from '@angular/core';
import { SharedService } from './shared.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { initializeApp } from 'firebase/app';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [SharedService]
})
export class AppComponent {
  items$: Observable<any[]>;

  constructor(
    private authS : AuthService,
    private firestore: Firestore, 
    private auth: Auth, 
    private router: Router  ) {
    const itemsCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(itemsCollection);

  }

  initializeApp(){
    this.authS.initializeauth();
  }


 
}
