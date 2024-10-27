import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://procesador-4b0b8-default-rtdb.firebaseio.com/procesadores.json';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
