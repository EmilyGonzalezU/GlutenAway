import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-loginoptions',
  templateUrl: './loginoptions.page.html',
  styleUrls: ['./loginoptions.page.scss'],
})
export class LoginoptionsPage {
  user: any
  constructor(private authService : AuthService, private router: Router) { }
  
  async signInGoogle(){
    this.user = await this.authService.googleSignIn()
    console.log(this.user);
    if (this.user) {
      this.router.navigate(['/starter-tab']);
    }
  }

  async signInEmail(){
    return this.router.navigate(['/login']);
  }
}


