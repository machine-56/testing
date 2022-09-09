const mongoose = require("mongoose");
const uri =
  "mongodb+srv://superadmin:F5nxY3vdwVsNg0uq@tpmsp-db.s5zticr.mongodb.net/TPMS";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected : newuser");
  })
  .catch(() => {
    console.error(Error);
  });
const Schema = mongoose.Schema;

var NewApvUserSchema = new Schema({
  name: String,
  uname: String,
  email: String,
  pwd: String,
  post: String,
  company: String,
  phoneNo: Number,
});

var ApvUserdata = new mongoose.model("apvuserdata", NewApvUserSchema);

module.exports = ApvUserdata;
