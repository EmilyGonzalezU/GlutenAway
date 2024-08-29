import { Component, OnInit } from '@angular/core';
import { SharedService } from '@srs/shared.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private sharedService: SharedService, private router: Router, public toastController: ToastController) { }
  isKeyboardOpen = false;
  
  ngOnInit() {
    // Detectar cuando el teclado se abre
    Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true;
    });

    // Detectar cuando el teclado se cierra
    Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardOpen = false;
    });
   }

  registration: any = {
    nombre: "",
    correo: "",
    contrasena: ""
  }
  field: string = "";

  registrationValidation() {
    const invalidFields = [];

    if (!this.validateModel(this.registration)) {
      invalidFields.push(...this.field.split(","));
    }

    if (!this.sharedService.validateName(this.registration.nombre)) {
      invalidFields.push('nombre');
    }

    if (!this.sharedService.emailValid(this.registration.correo)) {
      invalidFields.push('correo');
    }

    if (!this.sharedService.validatePassword(this.registration.contrasena)) {
      invalidFields.push('contrasena');
    }

    if (invalidFields.length > 0) {
      this.sharedService.errorVibration(invalidFields);
      this.sharedService.presentToast("top", "Por favor, completa los campos correctamente");
    } else {
      this.sharedService.presentToast("top", "Bienvenid@");
      this.router.navigate(['/home']);
    }
  }

  validateModel(model: any) {
    const emptyFields = [];
  
    for (const [key, value] of Object.entries(model)) {
      if (value === "") {
        emptyFields.push(key);
      }
    }
  
    if (emptyFields.length > 0) {
      this.field = emptyFields.join(",");
      return false;
    }
  
    return true;
  }

  navLogin(){
    return this.router.navigate(['/login']);
  }
}
