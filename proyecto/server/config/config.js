/**
 * PUERTO
 */
process.env.PORT = process.env.PORT || 8000

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


/**
 * Base de datos
 */

let urlDB;

if ( process.env.NODE_ENV == 'dev' ) {
    urlDB = "mongodb://db:27017/cafe"
} else {
    urlDB = "mongodb+srv://mariossan:Escom2121@cluster0.jnx8r.mongodb.net/cafe?retryWrites=true&w=majority"
}


 process.env.URL_DB = urlDB


 /**
  * Vencimiento del token
  */
    // 60 segundo
    // 60 minutos 
    // 24 horas
    //365 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 365;

/***
 * SEED de autenticacion
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';