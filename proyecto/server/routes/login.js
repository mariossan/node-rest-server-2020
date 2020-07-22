const express       = require('express')
const bcrypt        = require('bcrypt')
const jwt           = require('jsonwebtoken')
const Usuario       = require('../models/user')
const app           = express()


app.post('/login', (req, res) => {

    let body = req.body

    
    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                status: false,
                err
            })
        }
    
        
        if ( !usuarioDB ) {
            
            return res.status(400).json({
                status: false,
                err: {
                    message: '(Usuario) y/o contrase;a incorrectos'
                }
            })
        
        }

        if ( !bcrypt.compareSync( body.password, usuarioDB.password ) ) {
            return res.status(400).json({
                status: false,
                err: {
                    message: 'Usuario y/o (contrase;a) incorrectos'
                }
            })
        }

        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            user: usuarioDB,
            token
        })

    });
})


module.exports = app