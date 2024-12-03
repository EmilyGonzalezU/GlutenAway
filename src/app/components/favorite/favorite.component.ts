import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  favoriteRecipes: any[] = [];
  loading: boolean = false;

  constructor(private authService: AuthService, private recipeService: RecipeService) {}

  ionViewWillEnter() {
    this.loadFavoriteRecipes(); 
  }

  async loadFavoriteRecipes() {
    this.loading = true; 
    try {
      const apiRecipes = await this.recipeService.getRecetas().toPromise() || [];
      const globalRecipes = await this.authService.getGlobalRecipes();

      const apiFavorites = apiRecipes.filter((recipe) => recipe.fav);
      const globalFavorites = globalRecipes.filter((recipe) => recipe.fav);

      this.favoriteRecipes = [...apiFavorites, ...globalFavorites];

    } catch (error) {
      console.error('Error al obtener recetas favoritas');
    } finally {
      this.loading = false; 
    }
  }
  isModalOpen = false;
  openRecipe: any = null;
  setOpen(isOpen: boolean, recipe: any = null) {
    this.isModalOpen = isOpen;
    this.openRecipe = recipe;
  }

  modalRestart() {
    this.isModalOpen = false;
    this.openRecipe = null;
  }
}
