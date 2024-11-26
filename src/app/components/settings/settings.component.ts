import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: any = null;

  constructor(private emial: EmailComposer, private authService: AuthService, private auth: Auth) {}

  ngOnInit() {
    //Aca se llama a el usuario cuando la pagina se inicializa 
    this.loadUserInfo();
  }

  /**Metodo que carga la informacion del usuario, aca hace una condicion dependiendo del usuario que este logeando
   * user "normal" o user google para extraer al usuario "normal" solo hace validaciones con metodos de firebase en este caso auth.
   * En el caso de google este hace un user almacenado en localStorage cada que se inicie sesion con este. Para llamarlo queda almacenado en googleUser.
   * Ese objeto almacena el nombre, email y foto 
   */
  loadUserInfo() {
    onAuthStateChanged(this.auth, async (currentUser) => {
      if (currentUser) {
        try {
          if (currentUser.email) {
            this.user = await this.authService.getUserInfo(currentUser.email);
          } else {
            console.log('El correo del usuario no está disponible.');
          }
        } catch (error) {
          console.log('Error al cargar información del usuario');
        }
      } else {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          const googleUserInfo = JSON.parse(googleUser);
          this.user = {
            nombre: googleUserInfo.nombre ,
            email: googleUserInfo.correo,
            imagen: googleUserInfo.imagen
          };
        }
      }
    });
  }
  
  /**Este metodo cierra la sesion de los usuarios ya sea con google o usuario "normal", tambien elimina el usuario que se encuentra almacenado
   * en el localStorage y en caso de que sea usuario "normal" lo vuelve nulo para asegurar que no quede ningun registro del usuario que habia estado
   * logeado anteriormente.
   */
  logOut() {
    this.authService.logout();
    localStorage.removeItem('googleUser'); // Limpiar localStorage
    this.user = null; // Restablecer el objeto user
  }

  /**Metodo para enviar email de soporte a glutenAway */
  /**
   * sendEmail() {
    console.log('EmailComposer:', this.emial); // Depuración
  
    if (!this.emial) {
      console.error('EmailComposer no está disponible.');
      return;
    }
  
    this.emial.isAvailable().then((available: boolean) => {
      if (available) {
        const email = {
          to: 'shopd324@gmail.com',
          subject: 'Soporte Gluten Away',
          body: 'Describe aquí tu problema o consulta.',
          isHtml: true,
        };
        this.emial.open(email);
      } else {
        console.log('No se puede enviar el correo.');
      }
    });
  }  
   */
}
