import { Component, ViewChild, AfterViewInit} from '@angular/core';
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
  }

  
  //Metodo el cual abre las opciones de inicio de sesion
  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.modal?.dismiss(); 
      }
    });
  }
  //Metodo de navegacion en caso de que no desee ininicar seison con google
  async signInEmail() {
    return this.router.navigate(['/login']);
  }
  //metodo de navegacion a registrode usuario
  navRegistration() {
    return this.router.navigate(['/registration']);
  }
}
