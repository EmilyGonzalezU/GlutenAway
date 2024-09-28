import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  latitude: number | undefined;
  longitude: number | undefined;
  errorMsg: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log('Position:', position);
    } catch (error: any) {
      this.errorMsg = "Error getting location: " + error.message;
    }
  }

}
