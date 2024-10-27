import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private auth: Auth) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    onAuthStateChanged(this.auth, async (currentUser) => {
      if (currentUser) {
        try {
          if (currentUser.email) {
            this.user = await this.authService.getUserInfo(currentUser.email);
          } else {
            console.error('El correo del usuario no está disponible.');
          }
        } catch (error) {
          console.error('Error al cargar información del usuario:', error);
        }
      } else {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          const googleUserInfo = JSON.parse(googleUser);
          this.user = {
            nombre: googleUserInfo.nombre ,
            email: googleUserInfo.correo
          };
        }
      }
    });
  }
  
  logOut() {
    this.authService.logout();
    localStorage.removeItem('googleUser'); // Limpiar localStorage
    this.user = null; // Restablecer el objeto user
  }
}
