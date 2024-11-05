import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Asegúrate de importar tu AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  //Metodo que valida el router, aca valida si esta iniciado con firebase 
  //o google, valida google mediante una variable porque esta 
  //almacenada en el localStorage
  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }


}
