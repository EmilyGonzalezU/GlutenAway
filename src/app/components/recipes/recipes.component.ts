import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  optionSelected: string = 'forYou';
  isModalOpen = false;
  openRecipe: any = null;
  searchTerm: string = ''; 
  allRecipes: any[] = []; 
  recipes: any[] = []; 
  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecetas().subscribe(
      (data) => {
        this.allRecipes = data;
        this.filterRecipes();
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

 toggleFavorite(event: Event, recipe: any) {
  event.stopPropagation();
  recipe.fav = !recipe.fav;
  this.recipeService.updateFavorite(recipe).subscribe(
    (response) => {
      console.log(`Receta actualizada en la API: ${recipe.id}`);
      this.filterRecipes(); // Refresca la lista de favoritos
    },
    (error) => {
      console.error('Error al actualizar el favorito:', error);
      recipe.fav = !recipe.fav; 
    }
  );
}

  changeOption(option: string) {
    this.optionSelected = option;
    this.filterRecipes();
  }

  filterRecipes() {
    this.recipes = this.allRecipes
      .filter((recipe) => {
        if (this.optionSelected === 'favorites') {
          return recipe.fav;
        }
        return true;
      })
      .filter((recipe) =>
        recipe.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  setOpen(isOpen: boolean, recipe: any = null) {
    this.isModalOpen = isOpen;
    this.openRecipe = recipe;
  }

  modalRestart() {
    this.isModalOpen = false;
    this.openRecipe = null;
  }

  addNewRecipe() {
    this.router.navigate(['/starter-tab/add-new-recipe']);
  }
}
