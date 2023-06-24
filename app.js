const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorhandler");
const url = "mongodb://localhost/swipekart";
const dotenv = require("dotenv").config();

const app = express();

mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;

con.on("open", () => {
  console.log("connected....");
});

app.use(express.json());
app.use("/api/users", require("./routers/userRoutes"));
app.use(errorHandler);

//const port = process.env.PORT || 5000;
const port = 5001;

app.listen(port, () => {
  console.log("server started and listining on 5001");
});
