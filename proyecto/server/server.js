require('./config/config')

const express       = require('express')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')
const app           = express()
const port          = process.env.PORT


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Import user route
app.use( require('./routes/user') )


app.get('/', function (req, res) {
    res.send(["Welcome to practice Node Js class bla bla bla"])
})



mongoose.connect(
    "mongodb://db:27017/cafe",
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true 
    },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE!!!');
    }
)


app.listen(port, function(){
    console.log(`Servidor listo y escuchando en el puerto ${port}`)
})