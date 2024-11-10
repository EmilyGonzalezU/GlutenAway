import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-starter-tab',
  templateUrl: './starter-tab.page.html',
  styleUrls: ['./starter-tab.page.scss'],
})
export class StarterTabPage implements OnInit {
  inRecipes : boolean = false;
  constructor(private router: Router, private auth: Auth) {
    this.router.navigate(['starter-tab/recipes']);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.inRecipes = event.url.includes('recipes') ||
        event.url.includes('favorite') ||
        event.url.includes('myrecipes');
      }
    })
  }

  ngOnInit() {
  }

  segmentChanged($event:any){
    let direccion = $event.detail.value;
    this.router.navigate(['starter-tab/'+direccion]);
  }

  showSearchBar(){

  }
}
