// Load packages
const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// le but de ce serveur est de rendre accessible les données dont on pourra avoir besoin dans l'application.

app.use(bodyParser.json());
app.use(cors(corsOptions))

// Récupération des données du fichier json
var villes = JSON.parse(fs.readFileSync('data.json', 'utf8'));


// On a ci-dessous deux fonctions qui parcourent la DB contenant les données sur les villes
// jusqu'a obtenir celle recherchée (en triant soit par département soit par code postal)
// une fois la localité déterminée, ces fonctions renvoient la position GPS de celle-ci.
function getGPSCodePostal(codepostal) {
  villes_data = villes;
  for (var i = 0; i < villes_data.length; i++) {
    if (codepostal == villes_data[i].codes_postaux) {
      return [villes_data[i].latitude, villes_data[i].longitude];
    }
  }
  return "not found";
}

// Plusieurs villes peuvent partager le même département, par conséquent, cette méthode s'arrètera
// à la première ville qu'elle trouvera.
function getGPSDepartement(departement) {
  villes_data = villes;
  for (var i = 0; i < villes_data.length; i++) {
    if (departement == villes_data[i].numéro_département) {
      return [villes_data[i].latitude, villes_data[i].longitude];
    }
    else if (departement == villes_data[i].nom_département) {
      return [villes_data[i].latitude,villes_data[i].longitude];
    }
  }
  return "not found";
}

//requête GET sur une ville déterminée par son département.
app.route('/api/villes_data/departements/:departement').get((req, res) => {
  GPSdepartement = getGPSDepartement(req.params['departement']);
  res.send(200, GPSdepartement);
});

// requête GET sur un ville déterminée par son code postal.
app.route('/api/villes_data/codes_postaux/:code_postal').get((req, res) => {
  GPScodepostal = getGPSCodePostal(req.params['code_postal']);
  res.send(200, GPScodepostal);
});

//requête GET sur l'ensemble de la base de donnée sur les villes
app.route('/api/villes_data').get((req,res) => {
  res.send(200, villes);
})



app.listen(8000, () => {
  console.log('Server started on port 8000!');
});
