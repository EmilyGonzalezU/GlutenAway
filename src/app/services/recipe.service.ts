import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://procesador-4b0b8-default-rtdb.firebaseio.com/recipes.json';
  private url2= 'https://procesador-4b0b8-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(recipesData => {
        return Object.keys(recipesData).map(key => ({
          firebaseKey: key,
          ...recipesData[key],  
          id: recipesData[key].id,
          
        }));
      })
    );
  }

  updateFavorite(recipe: any): Observable<any> {
    return this.http.patch(`${this.url2}/recipes/${recipe.firebaseKey}.json`, { fav: recipe.fav });
  }
  getFavoriteRecipes(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(recipes => {
        return Object.keys(recipes)
          .map(key => ({ id: key, ...recipes[key] })) 
          .filter(recipe => recipe.fav === true); 
      })
    );
  }
}
