const express = require("express");
const router = express.Router();
const userSchema = require("../models/userModel");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentuser", validateToken, currentUser);

// router.get("/", async (req, res) => {
//   try {
//     const login = await LoginModel.find();
//     res.json(login);
//   } catch (err) {
//     res.send("Error: " + err);
//   }
// });

module.exports = router;
