const express = require("express")
const bookingController = require("../controllers/bookingController");

const router = express.Router();


router.post("/",bookingController.createBooking);

router.get("/",bookingController.findAll);

router.get("/search",bookingController.search);


router.get("/:id",bookingController.findOne);


router.put("/:id",bookingController.update);


router.delete("/:id",bookingController.remove);




module.exports = router;

