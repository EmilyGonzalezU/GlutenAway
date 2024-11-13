import { Component, OnInit } from '@angular/core';
import { SharedService } from '@srs/shared.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    private sharedService: SharedService,
    private router: Router,
    public toastController: ToastController,
    private authService: AuthService 
  ) {

   }

  isKeyboardOpen = false;

  ngOnInit() {}

  /**Datos en vacio para ser llamados dentro de los metodos y almacenarlos */
  registration: any = {
    nombre: "",
    correo: "",
    contrasena: ""
  }

  field: string = "";
  /**Metodo de registro el cual valida primero que todos los datos esten correctos al igual  que el login el metodo de error
   * es llamado del sharedService ya que, se utiliza en varias pages.
   */
  async registrationValidation() {
    const invalidFields = [];

    if (this.registration.nombre.trim() == "" || !this.sharedService.validateName(this.registration.nombre)) {
      this.sharedService.errorVibration(['nombre']);
      invalidFields.push('nombre');
    }

    if (this.registration.correo.trim() == "" || !this.sharedService.emailValid(this.registration.correo)) {
      this.sharedService.errorVibration(['correo']);
      invalidFields.push('correo');
    }

    if (this.registration.contrasena.trim() == "" || !this.sharedService.validatePassword(this.registration.contrasena)) {
      this.sharedService.errorVibration(['contrasena']);
      invalidFields.push('contrasena');
    }

    /**Una vez validados los datos se llama al authService para almacenar los datos de correo, contraseña y nombre */
    if (invalidFields.length > 0) {
      this.sharedService.presentToast("top", "Por favor, completa los campos correctamente.");
    } else {
      try {
        await this.authService.registerUser(
          this.registration.correo,
          this.registration.contrasena,
          this.registration.nombre
        );
        this.router.navigate(['/starter-tab']);
      } catch (error) {
        this.sharedService.presentToast("top", "Error al registrar.");
      }
    }
  }

  /**Metodo de navegacion al login */
  navLogin() {
    return this.router.navigate(['/login']);
  }
}
