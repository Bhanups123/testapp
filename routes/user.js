const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const Keys = require("../config/keys");
const router = express.Router();

router.post("/WebChat/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      const errors = {};
      errors.email = "User with this email already exist";
      res.status(400).json(errors);
    } else {
      const newUser = User({
        name,
        email,
        password
      });
      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

router.post("/WebChat/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      const errors = {};
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        const errors = {};
        errors.password = "Invalid Password!!";
        return res.status(401).json(errors);
      }
      const payload = {
        email: user.email,
        name: user.name
      };
      jwt.sign(payload, Keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ msg: "Congratulation!!!", token: "Bearer " + token });
        }
      });
    });
  });
});

// router.get(
//   "/test",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log("hello", req.user);
//     res.json({ msg: "done" });
//   }
// );

module.exports = router;
