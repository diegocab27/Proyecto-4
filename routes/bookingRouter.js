const express = require("express")
const bookingController = require("../controllers/bookingController");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Booking: { ... }
 */


/**
 * @swagger
 * /api/reservas:
 *  post:
 *    ...
 */
router.post("/",bookingController.createBooking);


/**
 * @swagger
 * /api/reservas:
 *  get:
 *    ...
 */
router.get("/",bookingController.findAll);


/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *    ...
 */
router.get("/search",bookingController.search);


/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *    ...
 */
router.get("/:id",bookingController.findOne);

/**
 * @swagger
 * /api/reservas/search:
 *  put:
 *    ...
 */
router.put("/:id",bookingController.update);


/**
 * @swagger
 * /api/reservas/search:
 *  delete:
 *    ...
 */
router.delete("/:id",bookingController.remove);




module.exports = router;

