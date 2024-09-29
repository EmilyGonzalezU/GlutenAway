import { Component, OnInit } from '@angular/core';
import { SharedService } from '@srs/shared.service';
import { Router } from '@angular/router';
import { ToastController, ModalController  } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private sharedService: SharedService, 
    private router: Router, 
    public toastController: ToastController, 
    private alertController: AlertController
  ) { }
   
  isKeyboardOpen = false;

  ngOnInit() {
    Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true;
    });

    Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardOpen = false;
    });
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Recuperación de Contraseña',
      message: 'Se ha enviado un correo electrónico con las credenciales para recuperar la contraseña.',
      buttons: ['OK']
    });
    await alert.present(); 
  }

  recuperationValidation() {
    const invalidFields = [];

    if (this.recuperation.correo.trim() == "" || !this.sharedService.emailValid(this.recuperation.correo)) {
      invalidFields.push('correo');
      this.sharedService.errorVibration(['correo']);
    }
  
    if (invalidFields.length > 0) {
      this.sharedService.presentToast("top", "Por favor, completa los campos correctamente");
    } else {
      this.presentAlert();
      //Resuelto error de usabilidad 
      this.router.navigate(['/login']);
    }
  }

  navLogin(){
    return this.router.navigate(['/login']);
  }
  
}
