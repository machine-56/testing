const express = require("express");
const partnerRouter = express.Router();
const multer = require("multer");
const path = require("path");
const partnerdata = require("../model/partnerModel");
const invoiceData = require("../model/invoicedata");
const workorderdata = require('../model/workOrderModel')

// get workorder
partnerRouter.post('/workorder', (req,res)=>{
  let uname = req.body.uname;
  partnerdata.findOne({'uname':uname}).then((data)=>{
    let uid = data.partner_id;
    workorderdata.find({"partner_id":uid}).then((data)=>{
      res.send(data);
    })
  })
})

// each Work order
partnerRouter.post("/workorder/each", (req, res) => {
  let wid = req.body.woid;
  workorderdata.findOne({ woid: wid })
  .then((data) => {
    res.send(data);
  })
  .catch(() => {
    res.send(Error).send();
  });
});

// get profile
partnerRouter.get("/profile/:id", (req, res) => {
  const uid = req.params.id;
  partnerdata.findOne({ "uname": uid }).then((data) => {
    res.send(data);
  });
});


// edit profile
partnerRouter.put("/edit", (req, res) => {
  (id = req.body._id),
    (image = req.body.image),
    (user = req.body.name),
    (uname = req.body.uname),
    (pwd = req.body.pwd),
    (post = req.body.post),
    (partner_id = req.body.partner_id),
    (pan = req.body.pan),
    (email = req.body.email),
    (phoneNo = req.body.phoneNo),
    (company = req.body.company),
    partnerdata
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: user,
            uname: uname,
            pwd: pwd,
            post: post,
            email: email,
            partner_id: partner_id,
            image: image,
            pan: pan,
            phoneNo: phoneNo,
            company: company,
          },
        }
      )
      .then(function () {
        res.send();
      });
});

// storing invoice
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var multipleUpload = multer({ storage: storage }).array("files");

// invoice form data saving
partnerRouter.post("/invoice", function (req, res) {
  var newInvoice = new invoiceData(req.body);
  newInvoice.save()
    .then((succ) => {
      res.status(200).json({
        success: true,
        message: "Invoice saved successfully",
      });
    })
    .catch((err) => {
    });
});

// pdf file saving
partnerRouter.post("/multifiles", (req, res) => {
  multipleUpload(req, res, (err) => {
    if (err) {
      console.log(err.message);
    }

    let img = [];
    req.files.forEach((file) => {
      img.push(file.filename);
    });

    res.json({
      path: img,
    });
  });
});

module.exports = partnerRouter;
