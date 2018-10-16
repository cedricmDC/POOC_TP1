const express = require('express')
const app = express()
const port = 3000
//On initialise notre utilitaire node pour communiquer avec le capteur
//(capteur = sensor en anglais)
const sensor = require('ds18b20');
//Identifiant de notre capteur, remplacez les X par ce que vous avez eu précédemment.
const sensorId = '28-01131a446afe';
//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
//Création d'une variable qui va nous permettre d'accéder à un GPIO du raspberry  
//⚠️ Le nombre passé en paramètre correspond au numéro de GPIO et non au numéro de la pin.
var led = new Gpio(18, 'out');
var led2 = new Gpio(23, 'out');


function generateMessage(temp) {
    if (temp > 30) {
	led.writeSync(1);
        return "il fait chaud!";
    } else if (temp < 15) {
	led2.writeSync(1);
        return "il fait froid!";
    } else {
        return "température agréable.";
    }
}

//Configuration du moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('public'));

//On retrouve le même comportement que notre serveur précédent
app.get('/tmp', (request, response) => {
  //De la même manière nous transformons notre fichier temperature.mustache en HTML en passant des paramètres.
    var temperature = sensor.temperatureSync(sensorId);
    message = generateMessage(temperature);
    response.render('temperature', {tmp: sensor.temperatureSync(sensorId), message: message});

});

app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }

  //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);

})

process.on('SIGINT', () => {
  led.unexport();
});
process.on('SIGINT', () => {
  led2.unexport();
});
