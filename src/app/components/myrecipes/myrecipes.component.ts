import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.scss'],
})
export class MyrecipesComponent implements OnInit {

  recipes: any[] = [];
  loading: boolean = false; 

  constructor(private authService: AuthService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadRecipes();
  }
  
  
  async loadRecipes() {
    this.loading = true; 
    const email = this.authService.getCurrentUserEmail();
    console.log(email)
    if (email) {
      try {
        this.recipes = await this.authService.getUserRecipes(email) || [];
      } catch (error) {
        console.error('Error al cargar recetas:', error);
      } finally {
        this.loading = false;
      }
    } else {
      console.log('No hay usuario autenticado');
      this.loading = false; 
    }
  }
  

  async doRefresh(event: RefresherCustomEvent) {
    await this.loadRecipes(); 
    event.target.complete(); 
  }
}
