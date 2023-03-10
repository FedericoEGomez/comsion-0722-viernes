import axios from "axios"

const listadoProductos = async () =>{
    try {
        const {data} = await axios.get("https://comsion-0722-viernes-production.up.railway.app/api/ver");
        return data
    } catch (error) {
        console.log({data: error.response.data,status: error.response.status})
    }
}
const guardarProducto = async (productoAGuardar) =>{
    try {
        const {data} = await axios.post("https://comsion-0722-viernes-production.up.railway.app/api/crear",{
            productoAGuardar
        });
        return data
    } catch (error) {
        console.log({data: error.response.data,status: error.response.status})
    }
}
const login = async (email, password) =>{
    try {
        const {data} = await axios.post("https://comsion-0722-viernes-production.up.railway.app/api/logintoken",{
            email: email,
            password: password
        });
        return data
    } catch (error) {
        console.log({data: error.response.data,status: error.response.status})
    }
}

const listadoProductosConToken = async (token) =>{
    try {
        const {data} = await axios.get("https://comsion-0722-viernes-production.up.railway.app/api/ver",{
            headers:{
               "x-token": token
            }
        });
        return data
    } catch (error) {
        console.log({data: error.response.data,status: error.response.status})
    }
}
const guardarProductoConToken = async (productoAGuardar, token) =>{
    try {
        const {data} = await axios.post("https://comsion-0722-viernes-production.up.railway.app/api/crear",{
            productoAGuardar
        },{
            headers:{
                "x-token": token
             }
        });
        return data
    } catch (error) {
        console.log({data: error.response.data,status: error.response.status})
    }
}