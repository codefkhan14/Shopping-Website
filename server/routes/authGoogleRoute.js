const router = require("express").Router();
const passport = require("passport");

router.get("/login/failed", (req, res) => {
  res.status(401).json({ message: "Login Failed" });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_LOCAL_URL,
    failureRedirect: "/auth/login/failed",
  })
);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

module.exports = router;
