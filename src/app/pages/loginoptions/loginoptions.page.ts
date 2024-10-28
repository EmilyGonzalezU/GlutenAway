import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { isPlatform } from '@ionic/angular';
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
  try {
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
  } catch (error) {
    console.error('Error en Google Sign-In:', error);
  }
}

  

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.modal?.dismiss(); 
      }
    });
  
  }

  async signInGoogle() {
    this.user = await this.googleSignIn();
    console.log(this.user);
    if (this.user) {
      console.log(this.user);
    }
  }

  async signInEmail() {
    return this.router.navigate(['/login']);
  }

  navRegistration() {
    return this.router.navigate(['/registration']);
  }
}
