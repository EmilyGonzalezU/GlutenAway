import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://procesador-4b0b8-default-rtdb.firebaseio.com/recipes.json';
  private url2= 'https://procesador-4b0b8-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateFavorite(recipe: any): Observable<any> {
    return this.http.patch(`${this.url2}/recipes/${recipe.id}.json`, { fav: recipe.fav });
  }
}
