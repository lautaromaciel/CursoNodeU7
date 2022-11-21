const express = require("express");
const cors = require("cors")

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPATH = "/api/usuarios"

        /* Middlewares */
        this.middlewares();

        /* Rutas */
        this.routes();
    }
    middlewares(){

        /* Cors */
        this.app.use(cors());

        /* Lectura y Parseo del Body */
        this.app.use(express.json( ))

        /* Directorio Público */
        this.app.use(express.static("public"));
    }
    routes(){
        // this.app.get("/api",(req,res)=>{
        //     res.json({
        //         msg : "get api"
        //     });
        // })
        // this.app.put("/api",(req,res)=>{
        //     res.json({
        //         msg : "put api"
        //     });
        // })
        // this.app.post("/api",(req,res)=>{
        //     res.json({
        //         msg : "post api"
        //     });
        // })
        // this.app.delete("/api",(req,res)=>{
        //     res.json({
        //         msg : "delete api"
        //     });
        // })
        this.app.use(this.usuariosPATH, require("../routes/usuarios"));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en el puerto",this.port);
        })
    }

}

module.exports = Server;