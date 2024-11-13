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
    /**Lo que hace esto es que "escucha"(?) los cambios de pages, por ende sabe en que page esta el usuario
     * entonces si el usuario no esta en las pages especificadas (recipes, favorites & myrecipes) lo muestra, si no, no.
     */
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
