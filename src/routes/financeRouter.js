const express = require("express");
const financeRouter = express.Router();
const invoicedata = require("../model/invoicedata");
const workorderdata = require("../model/workOrderModel");
const CounterData = require('../model/woidgenerationModel');
var path = require("path");

// workorder list display
financeRouter.get("/workorder", (req, res) => {
  workorderdata.find()
  .then((data) => {
    res.send(data);
  })
  .catch(() => {
    res.status(Error).send();
  });
});

// single view workorder
financeRouter.post("/workorder/each", (req, res) => {
  let wid = req.body.woid;
  workorderdata.findOne({ woid: wid })
  .then((data) => {
    res.send(data);
  })
  .catch(() => {
    res.send(Error).send();
  });
});

// approve workrder
financeRouter.put("/workorder/apv", (req, res) => {
  let data = req.body.id;
  CounterData.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    { new: true },
    (err, cd) => {
      let seqId;
      if (cd == null) {
        const newval = new CounterData({ id: "autoval", seq: 1 });
        newval.save();
        seqId = 1;
      } else {
        seqId = cd.seq;
      }
      workorderdata.findOneAndUpdate(
        { _id: data },
        {$set: {wo_status: "apvd", woid: "WO/" + req.body.pname + "/woid-00" + seqId,},})
        .then(() => {
          res.send();
        });
    }
  );
});

// Deny work order
financeRouter.delete("/workorder/remove/:id", (req, res) => {
  let id = req.params.id;
  workorderdata.findOneAndDelete({ _id: id })
  .then(() => {
    res.status(200).send()
  });
});

// payment remittance detials
financeRouter.get("/payment", (req, res) => {
  invoicedata.find({"invoice_status":'apvd'})
  .then((data) => {
    res.send(data);
  })
  .catch(() => {
    console.error();
    res.send();
  });
});

// pay
financeRouter.put("/payment/pay", (req, res) => {
  let id = req.body.id;
  invoicedata.findOneAndUpdate({ "_id": id }, { $set: { "paystatus": "paid" } })
  .then(()=>{
    res.send();
  })
});

// invoice pdf
financeRouter.get("/invoice/:id", function (req, res) {
  let id = req.params.id;
  res.sendFile(path.join(__dirname, `../../uploads/${id}`));
});

// set overdue status
financeRouter.put('/invoice/overdue', (req,res)=>{
  let uid = req.body.id;
  invoicedata.findByIdAndUpdate(
    {_id:uid},{$set:{paystatus:'overdue'}
  }).then(()=>{
    res.send();
  })
})

// add due comment invoice
financeRouter.put('/invoice/comment', (req,res)=>{
  let invoAdd = req.body;
  invoicedata.findByIdAndUpdate(
    {_id:invoAdd.invoid},{$set:{comment:invoAdd.comment}
  }).then(()=>{
    res.send();
  })
})

module.exports = financeRouter;
