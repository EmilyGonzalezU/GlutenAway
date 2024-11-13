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
    //Condicion para inicializar en capacitor (andorid studio)
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }
  
  //Bug Google 
/**Metodo de inicio de sesion de google aca lo que hace es iniciar sesion con metodos propios de google la unica diferencia es que
 * una vez validado que el user no este vacio este almacena el userName, userEmail y userImage para luego guardar todos esos datos en 
 * googleUserData lo cual sera almacenado en localStorage como googleUser
 */
async googleSignIn() {
  try {
    this.user = await GoogleAuth.signIn();
    if (this.user) {
      const userName = this.user.name;
      const userEmail = this.user.email;
      const userImage = this.user.imageUrl;

      const googleUserData = {
        nombre: userName,
        correo: userEmail,
        imagen: userImage,
      };
      //Aca se almacena en el local 
      localStorage.setItem('googleUser', JSON.stringify(googleUserData));
      this.auth.initializeauth();
      console.log(this.user);
      console.log(this.user.imagen);
    }
    return this.user;
  } catch (error) {
    console.error('Error en Google sign-in');
  }
}

  
  //Metodo el cual abre las opciones de inicio de sesion
  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.modal?.dismiss(); 
      }
    });
  }

  //Metodo que almacena el user mediante el metodo que definimos en googleSignIn
  async signInGoogle() {
    this.user = await this.googleSignIn();
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
