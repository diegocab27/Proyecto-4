const express = require("express")
const bookingController = require("../controllers/bookingController");

const router = express.Router();


router.post("/",bookingController.createBooking);//creacion de reserva

router.get("/",bookingController.findAll);//Mostrar listado de reservas

router.get("/search",bookingController.search);//Busqueda segun parametro

router.get("/:id",bookingController.findOne);//Encontrar reserva especifica

router.put("/:id",bookingController.update);//Actualizar reserva especifica

router.delete("/:id",bookingController.remove);//Eliminar reserva especifica

module.exports = router;

