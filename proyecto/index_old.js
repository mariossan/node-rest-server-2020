const schemas   = require('./schemas')

const express   = require('express')
const app       = express()
const port      = 8000


const users     = ['nada', 'mas', 'probando']
const songs     = []

app.use( express.json() )

app.get('/user', function (req, res) {
    res.send([users, "Mariossan", "Cris te amo mucho"])
})

app.post('/user', function (req, res) {
    // console.log(req.body)
    users.push( req.body )
    res.json({"msg": "usuario recibido"})
})


app.get('/song', function (req, res) {
    res.send(songs)
})

app.post('/song', function (req, res) {
    // console.log(req.body)
    songs.push( req.body )
    res.json({"msg": "Cancion recibida"})
})


app.listen(port, function(){
    console.log(`Servidor listo y escuchando en el puerto ${port}`)
})