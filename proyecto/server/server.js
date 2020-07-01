require('./config/config')

const express   = require('express')
const bodyParser = require('body-parser')

const app       = express()
const port      = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send(["haciendo una prueba con el rest server"])
})

app.get('/usuario', function (req, res) {
    res.send(["get Usuario"])
})

app.post('/usuario', function (req, res) {
    let body = req.body

    if ( body.nombre === undefined  ) {
        res.status(400).json({
            status: false,
            error: 'El nombre es obligatorio'
        })
    }
    
    res.send({person: body})
})

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    res.send(["put Usuario", id])
})

app.delete('/usuario', function (req, res) {
    res.send(["delete Usuario"])
})

app.listen(port, function(){
    console.log(`Servidor listo y escuchando en el puerto ${port}`)
})