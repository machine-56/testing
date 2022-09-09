const express = require("express");
const signupRouter = express.Router();
const newUserdata = require("../model/newuserModel");
// const partnerData = require("../model/partnerModel");

signupRouter.post("/", (req, res) => {
  // console.log(req);
  var newUser = {
    name: req.body.fullname,
    uname: req.body.uname,
    email: req.body.email,
    pwd: req.body.pwd,
    post: req.body.post,
    company: req.body.compname,
    phoneNo: req.body.phoneNo,
  };
  console.log(newUser);
  const user = new newUserdata(newUser);
  user.save();

  res.status(200).send();
});

module.exports = signupRouter;
