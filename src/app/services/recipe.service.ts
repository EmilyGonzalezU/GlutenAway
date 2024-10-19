import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'https://generaterecipes.openai.azure.com';
  private apiKey = 'cd35ad3c6dfb430196b18761a4d42e26';
  
  generateGlutenFreeRecipe(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'api-key': this.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      prompt: prompt,
      max_tokens: 150, 
      temperature: 0.7,
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
    
}
  

