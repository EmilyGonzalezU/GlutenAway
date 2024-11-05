import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '@srs/shared.service';
import { AuthService } from 'src/app/services/auth.service'; 

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
  isLoading = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    public toastController: ToastController,
    private authService: AuthService 
  ) { }

  ngOnInit() {
    this.isLoading = this.authService.isLoading;
   }

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
      this.isLoading = true;
      try {
        const user = await this.authService.loginUser(this.login.correo, this.login.contrasena);
        this.authService.initializeauth();
        //any to access
      } catch (error: any) {
        console.log(error)
        if (error.code === 'auth/invalid-credential') {
          this.sharedService.presentToast("top", "EL email o  contraseña es incorrecto. Intente de nuevo.");
        } else {
          this.sharedService.presentToast("top", "Ocurrió un error al iniciar sesión. Intente nuevamente.");
          console.error('Error en el login:', error);
        }
      } finally{
        this.isLoading = false;
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
