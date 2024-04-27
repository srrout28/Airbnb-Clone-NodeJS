const mongoose = require("mongoose");
const userModel = require("./user.model");

const bookingSchema = mongoose.Schema({
  property:{type: mongoose.Schema.Types.ObjectId, "ref": "Property",require: true},
  user:{type: mongoose.Schema.Types.ObjectId, "ref": "User", require: true}
},{timestamps:true})

const bookingModel = mongoose.model("Bookings", bookingSchema);

// Above model to create booking structure...

module.exports = bookingModel;