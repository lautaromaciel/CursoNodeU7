const Role = require("../models/rol");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "")=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El ${rol} no está registrado en la base de datos`)
    }
}

const  mailNuevo = async(correo = "") =>{
    
    const existeEmail = await Usuario.findOne({correo : correo});

    if(existeEmail){
        throw new Error(`El email : ${correo} ya está registrado`)
    }

}

const existeUsuarioPorId = async(id = "") =>{
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error("El id enviado no existe");
    }
}

module.exports = {
    esRoleValido,
    mailNuevo,
    existeUsuarioPorId
}