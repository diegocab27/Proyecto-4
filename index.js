const express = require("express");//Express.js para la creación del servido
const app = express();
const cors = require("cors");// CORS para permitir solicitudes de origen cruzado
require("dotenv").config();

const routes = require("./routes/bookingRouter");//Ruta de los endpoints


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(process.env.URL_BASE + "/", routes);//Direccion principal mas la ruta de endpoints





app.listen(process.env.PORT , () => {
    console.log(`listent in port ${process.env.PORT}`);
  });