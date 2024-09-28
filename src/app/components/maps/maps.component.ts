import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  latitude: number | undefined;
  longitude: number | undefined;
  errorMsg: string | undefined;
  map: any;

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
      this.loadMap();
    } catch (error: any) {
      this.errorMsg = "Error getting location: " + error.message;
    }
  }

  loadMap() {
    const mapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 17
    };

    const mapElement = document.getElementById('map');
    this.map = new google.maps.Map(mapElement, mapOptions);

    const marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map
    });

  }

}
