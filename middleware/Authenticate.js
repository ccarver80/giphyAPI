"use strict";
const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const users = require("../models").Users;

exports.authUser = async (req, res, next) => {
    // basic auth decoding creds
  const creds = auth(req);

//   Find user by username
  if (creds) {
    const user = await users.findOne({
      where: {
        username: creds.name,
      },
    });

    // If user is found
    if (user) {
      // compare passwords
      const authenticate = bcrypt.compareSync(creds.pass, user.password);

      //   if passwords match
      if (authenticate) {
        req.currentUser = user;
        next();
      }else {
        res.status(401).json({
          message: "Sorry username or password doesn't match"
        })
      }
    } else {
      // if there is no user
      res.status(401).json({
        message: "This username does not exist.",
      });
    }
  }
};
