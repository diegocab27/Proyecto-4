const express = require("express");
const app = express();
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express")
require("dotenv").config();

const routes = require("./routes/bookingRouter");


const swaggerOptions = {
  definition:{
    openapi:'3.0.0',
    info:{
      title:"Node API for Bookings",
      version:'1.0.0'
    },
    servers:[
      {
        url:'http://localhost:3000/',
      },

    ],


  },

  apis: ["./routes/bookingRouter.js"],

}

const swaggerDocs = swaggerJSDoc(swaggerOptions);





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(process.env.URL_BASE + "/", routes);
app.use("/",swaggerUI.serve,swaggerUI.setup(swaggerDocs))




app.listen(process.env.PORT , () => {
    console.log(`listent in port ${process.env.PORT}`);
  });