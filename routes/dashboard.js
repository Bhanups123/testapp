const express = require("express");
const passport = require("passport");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = express.Router();

router.get(
  "/WebChat/Dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("heeloo");
    io.on("connection", socket => {
      console.log("New User Connected");
      socket.username = req.user.name;
      socket.emit("testing", { username: socket.username });
    });
  }
);
router.get("/hello", (req, res) => {
  io.on("connection", socket => {
    console.log("New User Connected");
    //socket.username = req.user.name;
    socket.emit("testing", { username: "bhamnu" });
    res.send("hello");
  });
});
module.exports = router;
