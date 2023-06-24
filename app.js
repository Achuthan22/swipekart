const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorhandler");
const connection = require("./config/dbConnection");
require("dotenv").config();

const app = express();

connection();

app.use(express.json());
app.use("/api/users", require("./routers/userRoutes"));
app.use(errorHandler);

//const port = process.env.PORT || 5000;
const port = 5001;

app.listen(port, () => {
  console.log("server started and listining on 5001");
});
