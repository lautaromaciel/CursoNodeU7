const {response} = require("express");


const usuariosGet = (req,res = response)=>{

    const{limit=5,apikey} = req.query

    res.json({
        msg : "get api - desdeController",
        limit,
        apikey
    });
}

const usuariosPost = (req,res = response)=>{

    const {nombre,edad} = req.body;

    res.json({
        msg : "post api - desdeController",
        name : nombre,
        age : edad
    });
}

const usuariosPut = (req,res = response)=>{

    const id = req.params.id


    res.json({
        msg : "put api - desdeController",
        id
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut
}