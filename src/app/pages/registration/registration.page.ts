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
    Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true;
    });

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

    if (this.registration.nombre.trim()=="" || !this.sharedService.validateName(this.registration.nombre)) {
      this.sharedService.errorVibration(['nombre']);
      invalidFields.push('nombre');
    }

    if (this.registration.correo.trim()=="" ||!this.sharedService.emailValid(this.registration.correo)) {
      this.sharedService.errorVibration(['correo']);
      invalidFields.push('correo');
    }

    if (this.registration.correo.trim()=="" || !this.sharedService.validatePassword(this.registration.contrasena)) {
      this.sharedService.errorVibration(['contrasena']);
      invalidFields.push('contrasena');
    }

    if (invalidFields.length > 0) {
      this.sharedService.presentToast("top", "Por favor, completa los campos correctamente");
    } else {
      this.sharedService.presentToast("top", "Bienvenid@");
      this.router.navigate(['/home']);
    }
  }
  
  navLogin(){
    return this.router.navigate(['/login']);
  }
}
