import { Injectable } from '@angular/core';
import { createAnimation } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private router: Router, public toastController: ToastController) {}

  emailValid(email: string): boolean {
    const emailEstructure = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailEstructure.test(email);
  }

  errorVibration(fieldNames: string[]) {
<<<<<<< Updated upstream
    fieldNames.forEach(fieldName => {
      const element = document.querySelector(`.${fieldName}`);
      if (element) {
        const animation = createAnimation()
          .addElement(element)
          .duration(300)
          .iterations(3)
          .keyframes([
            { offset: 0, transform: 'translateX(0px)', opacity: '1' },
            { offset: 0.25, transform: 'translateX(-5px)', opacity: '0.8' },
            { offset: 0.5, transform: 'translateX(5px)', opacity: '0.8' },
            { offset: 0.75, transform: 'translateX(-5px)', opacity: '0.8' },
            { offset: 1, transform: 'translateX(0px)', opacity: '1' },
          ]);
        animation.play();6
      }
=======
    const elements = document.querySelectorAll(`.${fieldNames}`);
    elements.forEach(element => {
      const animation = createAnimation()
        .addElement(element)
        .duration(300)
        .iterations(2)
        .keyframes([
          { offset: 0, transform: 'translateX(0px)', opacity: '1' },
          { offset: 0.25, transform: 'translateX(-5px)', opacity: '0.8' },
          { offset: 0.5, transform: 'translateX(5px)', opacity: '0.8' },
          { offset: 0.75, transform: 'translateX(-5px)', opacity: '0.8' },
          { offset: 1, transform: 'translateX(0px)', opacity: '1' },
        ]);
      animation.play();
      console.log("animation")
>>>>>>> Stashed changes
    });
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 1500,
      position: position,
    });
    await toast.present();
  }

  validateName(name: string): boolean {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(name);
  }

  validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  navLogin(){
    return this.router.navigate(['/login']);
  }

}
