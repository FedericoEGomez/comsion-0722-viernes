const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)
        console.log('la base de datos ha sido conectada')
    } catch {
        console.log('problemas al conectar con la base de datos')
    }
}

module.exports = {connect}