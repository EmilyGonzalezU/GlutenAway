import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-loginoptions',
  templateUrl: './loginoptions.page.html',
  styleUrls: ['./loginoptions.page.scss'],
})
export class LoginoptionsPage implements AfterViewInit {
  user: any;
  @ViewChild('modal') modal!: IonModal;

  constructor(private platform: Platform, private router: Router) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
   }
  
  //Bug Google 
  async googleSignIn() {
    this.user = await GoogleAuth.signIn();
    //Una vez iniciado almacena el objeto que retorna en el localStorage
    if (this.user) {
      localStorage.setItem('googleUser', JSON.stringify(this.user)); 
    }

    return await this.user;
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
