const express = require("express");
const passport = require("passport");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get(
  "/WebChat/Dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(req.user);
    User.find({ _id: { $ne: req.user.id } }).then(users => {
      if (users) {
        res.json(users);
      } else {
        errors.notFound = "Not found";
        res.status(404).json(errors);
      }
    });
  }
);

router.get(
  "/WebChat/Dashboard/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.params.user_id).then(user => {
      if (user) {
        res.json(user);
      } else {
        errors.UserNotFound = "user not found";
        res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
