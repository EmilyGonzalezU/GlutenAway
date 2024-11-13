import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.scss'],
})
export class MyrecipesComponent  implements OnInit {

  constructor(private authService : AuthService) { }
  recipes: any[] = [];
    async ngOnInit() {
    const email = this.authService.getCurrentUserEmail(); 
    if (email) {
      this.recipes = await this.authService.getUserRecipes(email) || [];
    } else {
      console.log('No hay usuario autenticado');
    }
  }

}
