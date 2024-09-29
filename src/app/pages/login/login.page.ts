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
  }

  loginFunction() {
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
      this.sharedService.presentToast("top", "Bienvenid@ " + this.login.correo);
      this.router.navigate(['/starter-tab']);
    }
  }

  navRegistration(){
    return this.router.navigate(['/registration']);
  }

  navRecuperation(){
    return this.router.navigate(['/recpassword']);
  }

  navLoginOptions(){
    return this.router.navigate(['/loginoptions']);
  }
}

//ionic cap run android -l --external --> para ejecutar