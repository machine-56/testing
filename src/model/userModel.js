const mongoose = require('mongoose');
const uri = "mongodb+srv://superadmin:F5nxY3vdwVsNg0uq@tpmsp-db.s5zticr.mongodb.net/TPMS";
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('DB connected : user');
})
.catch(()=>{
    console.error(Error);
})
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    name:String,
    uname:String,
    pwd:String,
    post:String,
})

var Userdata = new mongoose.model('user',NewUserSchema);

module.exports = Userdata;