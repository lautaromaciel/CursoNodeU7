const {response} = require("express");
const bcryptjs = require("bcryptjs");


const Usuario = require("../models/usuario")



const usuariosGet = async (req,res = response)=>{

    const{limit=5,desde = 0} = req.query

    // res.json({
    //     msg : "get api - desdeController",
    //     limit,
    //     apikey
    // });

    // const usuarios = await Usuario.find({estado:true}).skip(desde).limit(limit);
    // const total = await Usuario.countDocuments({estado:true});

    const [usuarios,total] = await Promise.all([
        Usuario.find({estado:true}).skip(desde).limit(limit),
        Usuario.countDocuments({estado:true})
    ]) 
    

    res.json({
        total,
        usuarios
    })
    

}

const usuariosPost = async (req,res = response)=>{

    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }

    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});

    /* Verificar si el correo existe*/
    // const existeEmail = await Usuario.findOne({correo : correo})    ;
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg : "El correo ya está registrado"
    //     })
    // } 

    /* EncriptarPass */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    /* GuardarEnMongoDB */
    await usuario.save();

    res.json({
        msg : "post api - desdeController",
        usuario
    });
}

const usuariosPut = async (req,res = response)=>{

    const id = req.params.id

    const {_id,password,google,...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);


    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut
}