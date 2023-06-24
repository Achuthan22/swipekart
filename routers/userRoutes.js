const express = require("express");
const router = express.Router();
const userSchema = require("../models/userModel");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentuser", currentUser);

// router.get("/", async (req, res) => {
//   try {
//     const login = await LoginModel.find();
//     res.json(login);
//   } catch (err) {
//     res.send("Error: " + err);
//   }
// });

module.exports = router;
