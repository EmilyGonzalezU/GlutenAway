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
  private apiUrl3= 'https://procesador-4b0b8-default-rtdb.firebaseio.com/codebars.json';
  constructor(private http: HttpClient) { }

  /**Metodo que obtiene las recetas, a comparacion de codebars esta extrae las recetas con el id propio de las recetas
   * osea que 1=1 no 0=1
   */
  getRecetas(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(recipesData => {
        return Object.keys(recipesData).map(key => ({
          firebaseKey: key,
          ...recipesData[key],  
          //aca las extrae por id
          id: recipesData[key].id,
          
        }));
      })
    );
  }
  /**Metodo que obtiene los codigos de barras meidante el id de firebase (no cuentan con id propio cada codigo) */
  getCodeBars(): Observable<any[]> {
    //Api 3 con codebars
    return this.http.get<any>(this.apiUrl3).pipe(
      map(data => {
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
      })
    );
  }
  

/**Metodo que updatea los favoritos (true -> false viceversa(?) */
  updateFavorite(recipe: any): Observable<any> {
    return this.http.patch(`${this.url2}/recipes/${recipe.firebaseKey}.json`, { fav: recipe.fav });
  }

  /**Metodo que obtiene las recetas favoritas con un filtro de true */
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
