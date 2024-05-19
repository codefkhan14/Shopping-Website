const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/checkemail/forgotpassword", authController.checkMailFgPass);
router.post("/forgotpassword", authController.ForgPass);

module.exports = router;
