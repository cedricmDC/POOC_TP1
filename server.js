const express = require('express')
const app = express()
const port = 3000
app.get('/', (request, response) => {
response.send('Requ�te re�ue...')
})
app.get('/hello/:name', (request, response) => {
response.send('Hello, '+request.params.name+'!');
})
app.listen(port, (err) => {
if (err) {
return console.log('Erreur du serveur : ', err)
}
console.log(`Le serveur �coute sur le port ${port}\nRendez vous sur http://localhost:` + port)
})
