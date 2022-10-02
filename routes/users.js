var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { authUser } = require("../middleware/Authenticate");

router.use(express.json());

const users = require("../models").Users;

// Login existing user route
router.get("/user", authUser, async (req, res) => {
  try {
    const user = req.currentUser;
    console.log(user)
    //If worked sends back user info
    res.status(200).json(user);
  } catch (err) {
    res.json({
      message: "Something went wrong with the server:",
    });
  }
});

// Create a new user post route
router.post("/create_user", async (req, res) => {
  try {
    
    const salt = await bcrypt.genSalt();
    const hashpass = await bcrypt.hash(req.body.password, salt);
    const newUser = await users.create({
      username: req.body.username,
      password: hashpass,
    });

    res.status(201).json({ username: newUser });
  } catch (err) {
    console.log(err)
    res.status(404).json({message: err.message})
  }
});

module.exports = router;
