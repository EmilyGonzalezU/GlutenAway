import { Component, OnInit } from '@angular/core';
import { SharedService } from '@srs/shared.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-recpassword',
  templateUrl: './recpassword.page.html',
  styleUrls: ['./recpassword.page.scss'],
})
export class RecpasswordPage implements OnInit {
  recuperation: any = {
    correo: ""
  }
  field: string = "";
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

  recuperationValidation() {
    const invalidFields = [];

    if (!this.validateModel(this.recuperation)) {
      invalidFields.push(...this.field.split(","));
    }

    if (!this.sharedService.emailValid(this.recuperation.correo)) {
      invalidFields.push('correo');
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
