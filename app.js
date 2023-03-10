//lo que se instala
const express = require('express');
const logger = require("morgan");
const cors = require("cors")
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('dotenv').config();

//importe routes
const indexRouter = require("./routes/index")
const apiRouter = require("./routes/api")

//connect
const {connect} = require('./db/db')

//express
const app = express()

//usos con express
app.use(logger("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


//rutas
app.use("/", indexRouter)
app.use("/api", apiRouter)

//coneccion con la base de datos
connect();

module.exports = app
