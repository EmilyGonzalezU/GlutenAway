import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '@srs/shared.service';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de importar tu AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: any = {
    correo: "",
    contrasena: ""
  };

  constructor(
    private sharedService: SharedService,
    private router: Router,
    public toastController: ToastController,
    private authService: AuthService 
  ) { }

  ngOnInit() { }

  async loginFunction() {
    const invalidFields = [];

    if (this.login.correo.trim() == "" || !this.sharedService.emailValid(this.login.correo)) {
      invalidFields.push('correo');
      this.sharedService.errorVibration(['correo']);
    }

    if (this.login.contrasena.trim() == "") {
      invalidFields.push('contrasena');
      this.sharedService.errorVibration(['contrasena']);
    }

    if (invalidFields.length > 0) {
      this.sharedService.presentToast("top", "Por favor, completa los campos correctamente");
    } else {
      try {
        const user = await this.authService.loginUser(this.login.correo, this.login.contrasena);
        this.router.navigate(['/starter-tab']);
      } catch (error) {
        this.sharedService.presentToast("top", "El email no existe. Intente Registrarse." );
      }
    }
  }

  navRegistration() {
    return this.router.navigate(['/registration']);
  }

  navRecuperation() {
    return this.router.navigate(['/recpassword']);
  }

  navLoginOptions() {
    return this.router.navigate(['/loginoptions']);
  }
}
