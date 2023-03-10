const {Product} = require('../models/productos')
const {User} = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const generadorJWT = require('../helpers/generadorJWT')

module.exports = {
    saludo (req, res) {
        res.status(200).send('holaaaa chicos')
    },
    user (req, res) {
        res.status(200).send('ruta del usuario')
    },
    async lista (req, res) {
        const items = await Product.find()
        res.json({items})
    },
    async listaUnica (req, res) {
        const item = await Product.findById(req.params.id)
        res.json({item})
    },
    async crear (req, res) {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const item = new Product(req.body);
                await item.save();
                res.status(201).json(item);
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(401).json(error);
        }
    },
    async editar (req, res){
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                await Product.findByIdAndUpdate(req.params.id,req.body);
                res.status(201).json({msg: "El producto se actualizo id - " + req.params.id})
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },
    async eliminar (req, res){
       await Product.findByIdAndDelete(req.params.id)
       res.json({msg: "el producto se borro con exito"})
    },
    crearSession (req, res){
        const persona = {
            nombre: "Juan",
            idioma: "Español"
        };
        console.log(req.session)
        req.session.persona = persona;
        res.cookie("pruebaDeLaCookie",{detalle: "esto es una prueba"},{maxAge: 60000})
        console.log(req.session)
        res.json(req.session.persona)
    },
    pruebaSession (req, res){
        console.log(req.cookies.sessionDelUsuario)
        res.json(req.session.persona)
    },
    eliminarSession (req, res) {
        req.session.destroy();
        console.log(req.cookies.pruebaDeLaCookie)
        res.clearCookie("pruebaDeLaCookie")
        console.log(req.cookies.pruebaDeLaCookie)
        res.json({msg: 'session cerrada'})
    },
    ejemploPass (req, res){
        let salt = bcrypt.genSaltSync(15);
        let pass = "123456789"
        let hash = bcrypt.hashSync(pass,salt);
        let comparacion1 = bcrypt.compareSync(pass,hash)
        let comparacion2 = bcrypt.compareSync("987654321",hash)

        res.json({
            pass: pass,
            hash: hash,
            comparacion1: comparacion1,
            comparacion2: comparacion2
        })
    },
    async pruebaToken (req, res){
        const token = await generadorJWT(req.body)
        res.json(token)
    },
    testToken (req, res){
        res.send("paso el token")
    },
    async login (req, res) {
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email});
                if (usuario === null) {
                    res.json({msg: "El mail o la contraseña es incorrecto"})
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: "El mail o la contraseña es incorrecto"})
                }

                const user = {
                    _id: usuario._id,
                    name: usuario.name
                }

                req.session.persona = user
                if (req.body.remember) {
                    res.cookie("sessionDelUsuario",req.session.persona,{masAge: 150000})
                }
                res.json({msg: "usuario logeado"})

            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json(error)
        }
    },
    logout (req ,res){
        res.clearCookie("sessionDelUsuario");
        req.session.destroy();
        res.json({msg: "usuario deslogeado"})
    },
    async loginToken (req, res) {
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email});
                if (usuario === null) {
                    res.json({msg: "El mail o la contraseña es incorrecto"})
                }
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: "El mail o la contraseña es incorrecto"})
                }

                const token = await generadorJWT({id: usuario._id, email:usuario.email});
                console.log("ususerio logeado id :" + usuario.id)
                res.json({msg: "usuario logeado", token: token})
            } else {
                console.log(err)
                res.status(501).json(err)
            }
        } catch (error) {
            console.log(error)
            res.status(501).json(error)
        }
    },
}

