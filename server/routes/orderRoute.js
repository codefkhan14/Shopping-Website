const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/user-order", orderController.getAllOrder);

module.exports = router;
