import { Component, inject } from '@angular/core';
import { SharedService } from './shared.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [SharedService]
})
  //Fire base list
export class AppComponent {
  items$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const itemsCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(itemsCollection);
  }
}
