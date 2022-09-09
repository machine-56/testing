const mongoose = require('mongoose');
const uri = "mongodb+srv://superadmin:F5nxY3vdwVsNg0uq@tpmsp-db.s5zticr.mongodb.net/TPMS";
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('DB connected : work order');
})
.catch(()=>{
    console.error(Error);
})
const Schema = mongoose.Schema;

var NewWorkOrderSchema = new Schema({
    woid : String,
    issue_date : Date,
    partner_name : String,
    partner_id : String,
    program_name : String,
    traning_topics : String,
    date_start : Date,
    date_end : Date,
    mode : String,
    GSTno : String,
    tax_type : String,
    panNo : String,
    amount : Number,
    payterms : String,
    wo_status : String,
});

var WorkOrderdata = new mongoose.model('workorderdata',NewWorkOrderSchema);

module.exports = WorkOrderdata;
