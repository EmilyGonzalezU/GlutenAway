import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent  implements OnInit {

  optionSelected: string = 'forYou';

  recipes = [
    {
      titulo: 'Lasaña',
      tiempo: '85 min',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRjCnEj8ga3_zb4XhCuNyXm9oke8Q2ZDSGQA&s',
      favorite: false
    },
    {
      titulo: 'Empanadas de Pino',
      tiempo: '90 min',
      imagen: 'https://arancibiaeventos.cl/wp-content/uploads/2020/04/empanadas_de_pino.jpg',
      favorite: false
    },
    {
      titulo: 'Pizza',
      tiempo: '45 min',
      imagen: 'https://glutendence.com/wp-content/uploads/2023/01/pizza-sin-gluten.jpg',
      favorite: false
    },
    {
      titulo: 'Espagueti',
      tiempo: '20 min',
      imagen: 'https://s1.elespanol.com/2024/06/24/cocinillas/cocinar/865423986_244754591_1024x576.jpg',
      favorite: false
    }
  ];

  toggleFavorite(recipe : any) {
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

  constructor() { }

  ngOnInit() {}

}