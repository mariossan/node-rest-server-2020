const express           = require('express')
const bcrypt            = require('bcrypt')
const _                 = require('underscore')
const User              = require('../models/user')
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication')
const app               = express()

app.get('/user', verificaToken, (req, res) => {

    let page    = req.query.page  || 1
    let take    = req.query.take  || 5
    let filtro  = {google: true}

    take        = Number( take )
    page        = Number( ( page - 1 ) * take )
    filtro      = {estado: true}

    User.find(filtro)
        .skip(page)
        .limit(take)
        .exec( (err, users) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    err
                })
            }

            User.countDocuments(filtro, (err, conteo) => {
                res.send({
                    ok: true,
                    users,
                    conteo
                })
            })

        } )
})


/**
 * Metodo para insertar un nuevo usuario
 */
app.post('/user', [verificaToken, verificaAdminRole], async function (req, res) {
    let body = req.body

    let user = new User({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    })

    await user.save()
    .then((userDB) => {
        // userDB.password = null;
        res.send({
            ok: true,
            user: userDB
        })
    })
    .catch( (err) => {
        return res.status(400).json({
            status: false,
            err
        })
    })
})


/**
 * Método para hacer la actualzacion de un campo
 */
app.put('/user/:id', [verificaToken, verificaAdminRole], function (req, res) {
    let id      = req.params.id
    let body    = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] )
    
    User.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                status: false,
                err
            })
        }

        res.send({
            ok: true,
            usuarioDB
        })
    } )
})


/**
 * Metodo para eliminar usuarios
 */
app.delete('/user/:id', [verificaToken, verificaAdminRole], function (req, res) {
    let id      = req.params.id

    // ahora se hace la eliminacion
    //User.findByIdAndDelete(id, (err, usuarioBorrado) => {
    User.findByIdAndUpdate(id, {estado: false},{ new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                status: false,
                err
            })
        }

        if ( usuarioBorrado === null ) {
            res.send({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.send({
            ok: true,
            usuarioBorrado
        })

    })
})



module.exports = app