import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {

  

  constructor(private authService: AuthService, private auth: Auth) {}
  user: any = null;

  ngOnInit() {
    this.loadUserInfo();
  }
  loadUserInfo() {
    onAuthStateChanged(this.auth, async (currentUser) => {
      if (currentUser) {
        try {
          if (currentUser.email ) {
            this.user = await this.authService.getUserInfo(currentUser.email);
          } else {
            console.error('El correo del usuario no ests disponible.');
          }
        } catch (error) {
          console.error('Error al cargar informacion del usuario:', error);
        }
      } else {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          const googleUserInfo = JSON.parse(googleUser);
          this.user = {
            email: googleUserInfo.googleUser
          }
        }
      }
    });
  }

  logOut(){
    this.authService.logout();
  }
}
