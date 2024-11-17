import { Component, OnInit } from '@angular/core';
import { SharedService } from '@srs/shared.service';
import { Router } from '@angular/router';
import { ToastController, ModalController  } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService,
    private sharedService: SharedService, 
    private router: Router, 
    public toastController: ToastController, 
    private alertController: AlertController
  ) { }
   

  ngOnInit() {
  
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Recuperación de Contraseña',
      message: 'Se ha enviado un correo electrónico con las credenciales para recuperar la contraseña.',
      buttons: ['OK']
    });
    await alert.present(); 
  }

  async recuperationValidation() {
    if (this.recuperation.correo.trim() === "" || !this.sharedService.emailValid(this.recuperation.correo)) {
      this.sharedService.errorVibration(['correo']);
      this.sharedService.presentToast("top", "Por favor, ingresa un correo válido.");
      return;
    }

    try {
      // Llamada al servicio para enviar el correo de recuperacion
      await this.authService.resetPass(this.recuperation.correo);
      this.presentAlert()
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      this.sharedService.presentToast("top", "Hubo un error al enviar el correo. Inténtalo nuevamente.");
    }
  }


  navLogin(){
    return this.router.navigate(['/login']);
  }
  
}
