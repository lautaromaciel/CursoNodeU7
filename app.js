require("dotenv").config();
const Server = require("./models/server");

const server = new Server();

server.listen();

// const port = process.env.PORT

// // const app = express();

// // app.get("/",(req,res)=>{
// //     res.send("hola mundo");
// // })

// app.listen(port);

// console.log(port);

