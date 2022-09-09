const express = require("express");
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const userdata = require("../model/userModel");

loginRouter.post("/", (req, res) => {
  let user = req.body;

  userdata.findOne({uname: user.uname})
  .then((user)=>{let post='';
    if(!user){
      res.status(401).send({message:"Invalid Username"});
    }else{
      let username=user.uname; let password=req.body.pwd;
      post=user.post;
      if(password!==user.pwd){
      res.status(401).send({message:"Invalid Password"})
      }else {
          let payload = {subject:username+password}
          let token = jwt.sign(payload,'secretKey')
          res.status(200).send({token,post,username});
        }
      }
      })
    }  
  );


module.exports = loginRouter;

