const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosPost } = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/",usuariosPost);


router.delete("/",(req,res)=>{
    res.json({
        msg : "delete api"
    });
})



module.exports = router;