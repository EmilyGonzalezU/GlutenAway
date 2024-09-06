import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-tab',
  templateUrl: './starter-tab.page.html',
  styleUrls: ['./starter-tab.page.scss'],
})
export class StarterTabPage implements OnInit {

  constructor(private router: Router) {
    this.router.navigate(['starter-tab/recipes']);
  }

  ngOnInit() {
  }

  segmentChanged($event:any){
    let direccion = $event.detail.value;
    this.router.navigate(['starter-tab/'+direccion]);
  }

}
