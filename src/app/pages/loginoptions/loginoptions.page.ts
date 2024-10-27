import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { isPlatform } from '@ionic/angular';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginoptions',
  templateUrl: './loginoptions.page.html',
  styleUrls: ['./loginoptions.page.scss'],
})
export class LoginoptionsPage implements AfterViewInit {
  user: any;
  @ViewChild('modal') modal!: IonModal;

  constructor(private auth: AuthService, private platform: Platform, private router: Router) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }
  
  //Bug Google 
  async googleSignIn() {
    this.user = await GoogleAuth.signIn();
    if (this.user) {
      const userName = this.user.givenName || 'Usuario sin nombre';
      const userEmail = this.user.email;
      const userImage = this.user.imageUrl || 'ruta/a/imagen_default.jpg';
  
      const googleUserData = {
        nombre: userName,
        correo: userEmail,
        imagen: userImage,
      };
      localStorage.setItem('googleUser', JSON.stringify(googleUserData)); 
      this.auth.initializeauth();
      console.log(this.user);
    }
    return this.user;
  }
  

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.modal?.dismiss(); 
      }
    });

    
  }

  async signInGoogle() {
    const user: User = await this.googleSignIn();
  }

  async signInEmail() {
    return this.router.navigate(['/login']);
  }

  navRegistration() {
    return this.router.navigate(['/registration']);
  }
}
