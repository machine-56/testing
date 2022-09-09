const mongoose = require('mongoose');
const uri = "";
 mongoose.connect(uri,{
     useNewUrlParser: true,
     useUnifiedTopology: true
 })
 .then(()=>{
     console.log('DB connected : work order');
 })
 .catch(()=>{
     console.error();
 })
const Schema = mongoose.Schema;

var CounterSchema = new Schema({
    id : String,
    seq : Number
});

var CounterData = new mongoose.model('partnercounters',CounterSchema,'partnercounters');

module.exports = CounterData
