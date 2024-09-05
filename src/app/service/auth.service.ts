import { Injectable } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { isPlatform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private platform: Platform) { 
    this.platform.ready().then(() => {
      GoogleAuth.initialize()
    })
  }

  user: any

  async googleSignIn() {
    if (! isPlatform('capacitor')) {
      GoogleAuth.initialize()
    }
    this.user = await GoogleAuth.signIn();
  
    return await this.user;
  }
}
