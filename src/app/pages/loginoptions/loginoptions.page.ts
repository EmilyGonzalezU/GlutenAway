import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-loginoptions',
  templateUrl: './loginoptions.page.html',
  styleUrls: ['./loginoptions.page.scss'],
})
export class LoginoptionsPage implements AfterViewInit {
  user: any;
  @ViewChild('modal') modal!: IonModal;

  constructor(private authService: AuthService, private router: Router) { }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.modal?.dismiss(); 
      }
    });
  }

  async signInGoogle() {
    this.user = await this.authService.googleSignIn();
    console.log(this.user);
    if (this.user) {
      this.router.navigate(['/starter-tab']);
    }
  }

  async signInEmail() {
    return this.router.navigate(['/login']);
  }

  navRegistration() {
    return this.router.navigate(['/registration']);
  }
}
