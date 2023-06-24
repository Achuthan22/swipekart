const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
 // console.log(req.body);
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = userModel.findOne({ email });
 // console.log("userAvailable", userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash Password
  const hashedPasword = await bcrypt.hash(password, 10);
 // console.log(hashedPasword);

  const user = await userModel.create({
    username,
    email,
    password: hashedPasword,
  });
  ////console.log(user);

  if (user) res.status(201).json({ _id: user.id, email: user.email });
  else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Registered successfully" });
});

//@desc login user
//@route POST /api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  try {
    res.json({ message: "Login successfully" });
  } catch (err) {
    res.send("Error: " + err);
  }
});

//@desc current user
//@route GET /api/users/currentuser
//@access PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  try {
    res.json({ message: "Current user information" });
  } catch (err) {
    res.send("Error: " + err);
  }
});

module.exports = { registerUser, loginUser, currentUser };
