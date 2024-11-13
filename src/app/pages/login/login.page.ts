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
    //Scroll de carga para el login
    this.isLoading = this.authService.isLoading;
   }

   /**Metodo de login el cual antes de ingresar el usuario se valida si los campos ingresados son correctos
    * Los metodos de validacion de correo y toast son llamados de un sharedService el cual sirve para compartir metodos, algo util para reclicar codigo.
    * Una vez validados los ingresos pasa por la validacion de firebase donde "injecta" los datos inigresados para ser validados porstiormente por los
    * metodos establecidos en el authService con el metodo initializeAuth()
    * En caso de haber un error no se puede diferenciar si es que es por correo o contraseña, por eso es la razon del mensaje general.
    */
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

  /**Metodo de navegacion a el registro de usuario */
  navRegistration() {
    return this.router.navigate(['/registration']);
  }
  /**Metodo de navegacion para la recuperacion de contraseña */
  navRecuperation() {
    return this.router.navigate(['/recpassword']);
  }

  /**Metodo de navegacion a loginOptions (home) */
  navLoginOptions() {
    return this.router.navigate(['/loginoptions']);
  }
}
