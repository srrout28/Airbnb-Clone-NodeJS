const mongoose = require("mongoose");
const userModel = require("./user.model");

const propertySchema = mongoose.Schema({
  description:{type: String, require: true},
  image:{type: String, require: true},
  location:{type: String, require: true},
  price:{type: Number, require: true},
  rating:{type: Number},
  user:{type: mongoose.Schema.Types.ObjectId, "ref": "User", require: true}
},{timestamps:true})

const propertyModel = mongoose.model("Property", propertySchema);


// Above model to create property structure to store in MongoDB...

module.exports = propertyModel;