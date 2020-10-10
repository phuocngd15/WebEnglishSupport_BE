const mongoose = require('mongoose');

const crudImg = new mongoose.Schema({
  // title:String,
  image: String
});

module.exports = mongoose.model('crudImg', crudImg);
