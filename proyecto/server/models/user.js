const  mongoose         = require('mongoose')
const uniqueValidator   = require('mongoose-unique-validator');
let Schema              = mongoose.Schema;

let validatedRoles = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema   = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La password es obligatorio']
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        default: 'USER_ROL',
        enum: validatedRoles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    let user        = this
    let objectUser  = user.toObject()
    
    delete objectUser.password

    return objectUser
}

usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser único'
} )


module.exports = mongoose.model('User', usuarioSchema)