import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AddNewRecipeComponent } from '../add-new-recipe/add-new-recipe.component';

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
  constructor(private modalController: ModalController, private authService : AuthService, private router: Router, private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  async loadRecipes() {
    try {
      const apiRecipes = await this.recipeService.getRecetas().toPromise() || [];
      const globalRecipes = await this.authService.getGlobalRecipes();
  
      const normalizedGlobalRecipes = globalRecipes.map(recipe => ({
        ...recipe,
        fav: recipe.fav || false,
        titulo: recipe.titulo || 'Sin título',
        isGlobal: true,
      }));
  
      const normalizedApiRecipes = apiRecipes.map(recipe => ({
        ...recipe,
        isGlobal: false,
      }));
  
      this.allRecipes = [...normalizedApiRecipes, ...normalizedGlobalRecipes];
      this.filterRecipes();
    } catch (error) {
      console.error('Error cargando recetas:', error);
    }
  }


  toggleFavoriteGlobal(event: Event, recipe: any) {
    event.stopPropagation();
  
    recipe.fav = !recipe.fav;
  
    //actualiza en Firebase
    this.authService.updateGlobalRecipe(recipe).subscribe(
      () => {
        console.log(`Estado de favorito actualizado para la receta: ${recipe.titulo}`);
      },
      (error) => {
        console.error('Error al actualizar el favorito');
        recipe.fav = !recipe.fav; 
      }
    );
  }
  async addNewRecipe() {
    const modal = await this.modalController.create({
      component: AddNewRecipeComponent,
      initialBreakpoint: 0.85, 
      breakpoints: [0.5, 0.85, 1],
    });

    await modal.present();
  }

  toggleFavorite(event: Event, recipe: any) {
    event.stopPropagation(); 
  
    if (recipe.isGlobal) {
      //si la receta es global(publica) llama altoogle favorite global 
      this.toggleFavoriteGlobal(event, recipe);
    } else {
      recipe.fav = !recipe.fav;
  
      this.recipeService.updateFavorite(recipe).subscribe(
        () => {
          console.log(`Estado de favorito actualizado para la receta: ${recipe.id}`);
          this.filterRecipes();
        },
        (error) => {
          console.error('Error al actualizar el favorito:', error);
          recipe.fav = !recipe.fav;
        }
      );
    }
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
      .filter((recipe) => {
        const titulo = recipe.titulo || ''; 
        return titulo.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
  }

  setOpen(isOpen: boolean, recipe: any = null) {
    this.isModalOpen = isOpen;
    this.openRecipe = recipe;
  }

  modalRestart() {
    this.isModalOpen = false;
    this.openRecipe = null;
  }

}