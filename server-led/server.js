const express = require('express')
const app = express()
const port = 3000

const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
const led = new Gpio(17, 'out');
const led2 = new Gpio(27, 'out');
//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');

//Configuration du moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('public'))


//On retrouve le même comportement que notre serveur précédent
app.get('/', (request, response) => {
  //Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
  response.render('index');
})

app.get('/hello/:name', (request, response) => {
  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('hello', {name: request.params.name});
})
app.get('/pooc/:text', (request, response) => {
  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('pooc', {name: request.params.text});
})

//Allumer et éteindre les leds
app.get('/on', (request, response) => {
  response.render('on', {name: request.params.text});
  led.writeSync(1);
  led2.writeSync(1);
})

app.get('/off', (request, response) => {
  response.render('off', {name: request.params.text});
  led.writeSync(0);
  led2.writeSync(0);
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }
  //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
})
