import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent  implements OnInit {

  optionSelected: string = 'forYou';
  isModalOpen = false;
  openRecipe: any = null;
  recipes: any[] = [];

  toggleFavorite(event : Event,recipe : any) {
    event.stopPropagation();
    recipe.favorite = !recipe.favorite;
  }

  getRecipes(){
    if (this.optionSelected === 'favorites'){
      return this.recipes.filter(recipe => recipe.favorite);
    }
    return this.recipes;
  }

  changeOption(option: string){
    this.optionSelected = option;
  }

  constructor(private router: Router, private recipeService : RecipeService) {}

  addNewRecipe() {
    this.router.navigate(['/starter-tab/add-new-recipe']);
  }
  

  setOpen(isOpen: boolean, recipe: any = null) {
    this.isModalOpen = isOpen;
    this.openRecipe = recipe;
  }
 
  modalRestart(){
    this.isModalOpen = false;
    this.openRecipe = null;
  }
  
  ngOnInit() 
  {
    this.recipeService.getRecetas().subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

}