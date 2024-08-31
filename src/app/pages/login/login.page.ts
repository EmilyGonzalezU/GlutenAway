import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '@srs/shared.service';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any={
    correo:"",
    contrasena:""
  }
  field:string="";

  constructor(private sharedService: SharedService, private router:Router, public toastController:ToastController) { }
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

  loginFunction() {
    const invalidFields = [];
  
    // Empty fields
    if (!this.validateModel(this.login)) {
      invalidFields.push(...this.field.split(","));
    }
  
    // email validation
    if (!this.sharedService.emailValid(this.login.correo)) {
      invalidFields.push('correo');
    }
  
    if (invalidFields.length > 0) {
      this.sharedService.errorVibration(invalidFields);
      this.sharedService.presentToast("top", "Por favor, completa los campos correctamente");
    } else {
      this.sharedService.presentToast("top", "Bienvenid@");
      this.router.navigate(['/starter-tab']);
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

  navRegistration(){
    return this.router.navigate(['/registration']);
  }

  navRecuperation(){
    return this.router.navigate(['/recpassword']);
  }

}

//ionic cap run android -l --external --> para ejecutar