import { Component, OnInit } from '@angular/core';
// on importes d'abord les différents modules permettant d'obtenir un carte googlemaps
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
// puis le service GpsService qui permet d'obtenir les coordonnées gps d'un département ou d'un code postal
import {GpsService} from '../gps.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
 map: google.maps.Map;

// On ajoute GpsService au constructeur afin de pouvoir utiliser ses méthodes
  constructor(private GpsService: GpsService) { }

  code_postal: any;
  departement: any;

// on initialise la googlemap sur une ville choisie au préalable
  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(49.1191, 6.1727),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }


// les deux méthodes suivantes servent à changer de googlemap à partir
// du code postal/du département envoyé en utilisant les méthodes de
// GpsService pour obtenir la localisation GPS demandée.
setMapByCP() {
  var codepostal = this.code_postal;
  var gps = this.GpsService.getGpsCodePostal(codepostal);
  var latitude = gps[0];
  var longitude = gps[1];
  this.map.setCenter(new google.maps.LatLng(latitude, longitude));
  }




setMapByDptmt(){
  var departement = this.departement;
  var gps = this.GpsService.getGpsDepartement(departement);
  var latitude = gps[0];
  var longitude = gps[1];
  this.map.setCenter(new google.maps.LatLng(latitude, longitude));
  }

}
