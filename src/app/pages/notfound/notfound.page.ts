import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotfoundPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  nav(){
    if(this.auth.isLoggedIn !==null){
      this.router.navigate(['/starter-tab']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
