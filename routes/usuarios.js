
const { Router } = require("express");
const {check} = require("express-validator");


const { usuariosGet, usuariosPut, usuariosPost } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, mailNuevo, existeUsuarioPorId } = require("../helpers/db-validator");


const Role = require("../models/rol");
const Usuario = require("../models/usuario");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[
    check("id", "No es un ID de MongoDb Válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role","No es un rol valido").custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post("/",[
    check("correo","No es un correo valido").isEmail(),
    check("correo").custom(correo => mailNuevo(correo)),
    check("password","Tiene que tener al menos 6 caracteres").isLength({min:6}),
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    // check("rol","No es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    // check("role").custom(async (rol = "")=>{
    //     const existeRol = await Role.findOne({rol});
    //     if(!existeRol){
    //         throw new Error(`El ${rol} no está registrado en la base de datos`)
    //     }
    // }),
    check("role","No es un rol valido").custom(esRoleValido),
    validarCampos
] ,usuariosPost);




const borrar = async (req,res)=>{
    const id = req.params.id

    // const usuario = await Usuario.findByIdAndDelete(id);
    await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuario = await Usuario.findById(id);
    
    res.json({
        usuario
    });
}

router.delete("/:id",[
    check("id", "No es un ID de MongoDb Válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
], borrar)


module.exports = router;