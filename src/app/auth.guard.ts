import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Asegúrate de importar tu AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    //Loggin detection
    if (this.authService.isLoggedIn()) {  
      return true;  
    } else {
      //Redirection to login 
      this.router.navigate(['/login']); 
      return false;
    }
  }


}
