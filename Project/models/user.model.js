// const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name:{type: String, require: true},
  username:{type: String, require: true, unique: true, trim: true},
  email:{type: String, require: true, unique: true, trim: true},
  mobile:{type: Number, require: true, unique: true},
  password:{type: String, require: true},
  isAdmin:{type: Boolean, default: false}
},{timestamps:true});


// userSchema.pre("post", async function(next){
//   if(!this.isModified("password")){
//     return next();
//   };
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function(password){
//   return await bcrypt.compare(password, this.password)
// };

// userSchema.methods.generateAccessToken = async function(){
//   return jwt.sign(
//     {
//       _id: this._id,
//       username: this.username,
//       email: this.email
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//     }
//   )
// }

// userSchema.methods.generateRefreshToken = async function(){
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//     }
//   )
// }



// userSchema.methods.generateRefreshToken = async function(){
  
// }

const userModel = mongoose.model("User", userSchema);

// Above code to create user model which will be stored in MongoDB...

module.exports = userModel;