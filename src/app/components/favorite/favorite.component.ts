import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent  implements OnInit {

  constructor(private recipeService: RecipeService) { }
  favoriteRecipes: any[] = [];
  ngOnInit() {
    this.loadFavoriteRecipes();
  }

  loadFavoriteRecipes() {
    this.recipeService.getFavoriteRecipes().subscribe(
      (recipes) => {
        this.favoriteRecipes = recipes;
      },
      (error) => {
        console.error('Error al obtener recetas favoritas:', error);
      }
    );
  }
}
