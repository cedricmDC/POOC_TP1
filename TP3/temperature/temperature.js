//On initialise notre utilitaire node pour communiquer avec le capteur 
//(capteur = sensor en anglais)
const sensor = require('ds18b20');
//Identifiant de notre capteur, remplacez les X par ce que vous avez eu précédemment.
const sensorId = '28-01131a446afe';
//On lit la température en provenance du capteur.
var temperature = sensor.temperatureSync(sensorId);
//On affiche dans le terminal la température.
console.log('La température est de ' + temperature);
