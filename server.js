const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const socket = require("socket.io");
const user = require("./routes/user");
const dashboard = require("./routes/dashboard");

mongoose.connect("mongodb://localhost/web_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

const port = process.env.PORT || 6039;
const server = app.listen(port, () =>
  console.log(`Server is running on PORT ${port}`)
);

const io = socket(server);

io.on("connection", socket => {
  console.log("New User Connected");
  socket.emit("testing", { username: "bhanu" });
});

//use routes
app.use(user);
app.use(dashboard);
