const router = require("express").Router();
const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.payment);
router.post("/verification", paymentController.paymentVerification);

module.exports = router;
