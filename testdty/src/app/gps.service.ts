import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GpsService {

  constructor(private http: HttpClient) { }

// ces deux fonctions servent à communiquer avec le server express qui dispose des données
// permettant d'obtenir à partir un numéro ou un nom de département ou un code postal, les
// coordonnées gps correspondantes.
  getGpsDepartement(numero_ou_nom) {
    return this.http.get('http://localhost:8000/api/villes_data/departements/numero_ou_nom');
  }

  getGpsCodePostal(code) {
    return this.http.get('http://localhost:8000/api/villes_data/codes_postaux/code');
  }
}
