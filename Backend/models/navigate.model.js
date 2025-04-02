const mongoose = require('mongoose');

const NavigationItemSchema = new mongoose.Schema({
  title: String,
  link:String,
  order: Number
});

module.exports = mongoose.model('NavigationItem', NavigationItemSchema);