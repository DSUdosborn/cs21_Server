const mongoose = require("mongoose");

//  Default item
// name:"Get groceries",
// description: "Go to this store blah blah",
// linkType: "Web Page",
// urls: "https://dsudosborn.github.io",
// done: false,
// assigned: new Date().toLocaleDateString(),
// updated: new Date().toLocaleDateString(),
// expired: new Date().toLocaleDateString()


const linkSchema = mongoose.Schema({
  name: String,
  description: String,
  linkType: String,
  urls: String,
  done: Boolean,
  assigned: Date,
  updated: Date,
  expired: Date,
});


const link = mongoose.model("link", linkSchema);

let store = {};

module.exports = {
  link,
  store,
};
