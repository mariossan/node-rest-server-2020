const mongoose = require('mongoose')

mongoose.connect(
    "mongodb://db/espotifai",
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true 
    }
)

// mongoose.connect(
//     "mongodb+srv://mariossan:Escom2121$@cluster0-jnx8r.mongodb.net/test?retryWrites=true&w=majority",
//     // "mongodb+srv://mariossan:Escom2121@cluster0-jnx8r.gcp.mongodb.net/test?retryWrites=true&w=majority",
//     { useNewUrlParser: true }
// )

const db = mongoose.connection

db.once("open", function(){
    console.log("Base de datos abierta!")
})  