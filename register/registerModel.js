const mongoose = require('mongoose');

const account = new mongoose.Schema({
    name: String,
    age: String,
    gender:String,
    address:String,
    email:String,
    phone:String,
    username: String,
    levels: String,
    achievement :String,
    status:Boolean
})

module.exports = mongoose.model("Account", account);