const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  let checkuser =  await UserModel.find({email:email})


  if(checkuser.length>0){
    res.send({"msg":"User already exist, please login"})
  }
  else{
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "Somethong went wrong", error: err.message });
      } else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "New Users has been registered" });
      }
    });
  } catch (err) {
    res.send({ msg: "Somethong went wrong", error: err.message });
  }}
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ course: "backend" }, "masai");
          res.send({ msg: "Logged IN ", token: token });
        } else {
          res.send({ msg: "Wrong Credential in pass" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credential" });
    }
  } catch (err) {
    res.send({ msg: "Somethong went wrong", error: err.message });
  }
});

module.exports = { userRouter };
