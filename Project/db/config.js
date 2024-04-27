const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGOBD_URI;

const dbConnect = async ()=>{
  try {
    mongoose.connect(URI)
    .then(()=>console.log("Database Connected successfully...!!!"));
  } catch (error) {
    console.log(error);
  }
}

//Code to connect database...

module.exports = dbConnect;