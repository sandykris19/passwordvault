const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/Login", authController.login_get);
router.post("/Login", authController.login_post);

router.get("/Logout", authController.logout_get);

module.exports = router;
