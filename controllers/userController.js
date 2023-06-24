const asyncHandler = require("express-async-handler");
const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecert = "achuthan123";

//@desc Register a user
//@route POST /api/users/register
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await users.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash Password
  const hashedPasword = await bcrypt.hash(password, 10);
  console.log(hashedPasword);

  const user = await users.create({
    userName,
    email,
    password: hashedPasword,
  });
  console.log(user);

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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await users.findOne({ email });
  // Compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      accessTokenSecert,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc current user
//@route GET /api/users/currentuser
//@access PRIVATE
const currentUser = (req, res) => {
  res.status(201).json({ ...req.user });
};

module.exports = { registerUser, loginUser, currentUser };
