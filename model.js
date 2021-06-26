const mongoose = require("mongoose");

//  Default item
// name:"Get groceries",
// description: "Go to this store blah blah",
// linkType: "Web Page",
// instructions: "https://dsudosborn.github.io",
// done: false,
// assigned: new Date().toLocaleDateString(),
// updated: new Date().toLocaleDateString(),
// expired: new Date().toLocaleDateString()


const todoSchema = mongoose.Schema({
  name: String,
  description: String,
  linkType: String,
  instructions: String,
  done: Boolean,
  assigned: Date,
  updated: Date,
  expired: Date,
});


const Todo = mongoose.model("Todo", todoSchema);

let store = {};

module.exports = {
  Todo,
  store,
};
