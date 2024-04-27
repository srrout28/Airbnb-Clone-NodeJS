const mongoose = require("mongoose");
const express = require("express");
const userModel = require("../models/user.model");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {hashedPassword, passwordMatching} = require("../middlewares/authentication.middleware");


const userSignup = async (req, resp)=>{
  try {
    const {name, username, email, mobile, password} =await req.body;

  if(!name || !username || !email || !mobile || !password){
  return resp.status(400).send("All fields are mandatory!!!")
  };

  const user = await userModel.findOne({$or:[ {username}, {email}, {mobile} ]});

  if(!user){
    const encryptedPassword = await hashedPassword(password);
    const newUser = new userModel({name, username, email, mobile, password: encryptedPassword});
    const respo = await newUser.save();
    return resp.status(201).send(`User Created successfully!!! 
    Your User Id is: ${respo.username}<br><br>
    <a href="/api/user/login" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Login</a>

    <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Home</a>
    `)
    
    // return resp.status(201).render("login")
  }else{
    return resp.status(400).send(`User already registered!
    <a href="/api/user/login" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Login</a>

    <a href="/api/user/signup" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Back</a>
    `);
  }

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`);
  }
  
}
// Above code for signup or create a new user...

const userLogin = async (req, resp)=>{
  try {
    const {email, username, password} = await req.body;
  if(!email && !username || !password){
  return resp.status(400).send({msg:`Carefull, All fields are mandatory!!!`})
  };

  const user = await userModel.findOne({$or:[ {username}, {email} ]});

  if(!user){
    return resp.status(404).send({msg:`User not registered`})
  }

  // const matchPassword = await bcrypt.compare(password, user.password);

  const matchPassword = await passwordMatching(password, user.password)
  // console.log(matchPassword)
  if( matchPassword ){
    const payLoad = {id: user._id, username: user.username};
    const privateKey = process.env.ACCESS_TOKEN_SECRET;
    const tokenExpire = process.env.ACCESS_TOKEN_EXPIRY;
    const accessToken = jwt.sign(payLoad, privateKey, {expiresIn: tokenExpire});
    // console.log(accessToken);

    // const verifyToken = jwt.verify(accessToken, privateKey);
    // console.log(verifyToken);
    resp.cookie("accessToken", accessToken);

    resp.status(200).send(`Signing in successful!!!

    <a href="/api/user" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #16a085; color: white; border-radius: 5px">Goto profile</a>
    <br><br>
    <form method="post" action="/api/user/signout">
      <button type="submit" style="border: 2px solid black; padding: 5px; background-color: #c0392b; color: white; border-radius: 5px" class="btn btn-primary">Logout</button>
    </form>
    <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #27ae60; color: white; border-radius: 5px">Home</a>

    `);

  }else{
    return resp.status(401).send({msg:`Invalid credentials!!!`})
  }
    
  } catch (error) {
    return resp.status(500).send({error: `Error occured ${error}`})
  }
  
}
// Above code for user login...

const userSignout = async (req, resp)=>{
  const id = req.id;
  const user = await userModel.findById(id);

  resp.clearCookie("accessToken");
  return resp.status(200).send(`Loged out successfully...!!!
  <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Home</a>
  `);
  
}
// Above code for user logout...

const userProfile = async (req, resp)=>{
  try {
    const id = req.id;
    const user = await userModel.findById(id)
    // console.log(user);
    return resp.status(200).send({user});
  } catch (error) {
    console.log(error);
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
}
// Above to code to view user profile...

const userUpdate = async (req, resp)=>{
  try {
    const id = req.params.id;
    // const operatorId = req.id;
    // const operatingUser = await userModel.findById(operatorId);
    // console.log(operatingUser.isAdmin);
    if (id !== req.id){
      return resp.status(400).send({error: `Unauthorised access`})
    }

    const findId = await userModel.findById(id);
    if(!findId){
      return resp.status(400).send({error: `Id not found`})
    }else{
      // if (!req.body){
      //   return resp.status(400).send({error: `Field(s) required to update`})
      // }
      const respo = await userModel.findByIdAndUpdate(id, req.body);
      return resp.status(200).send({Msg: "User Updated", User: respo});
    }
    
  } catch (error) {
    return resp.status(500).send({error: `Enter valid credentials ${error}`})
  }
  
}
// Above to code to update user profile...

const deleteUser = async (req, resp)=>{
  try {
    const id = req.params.id;
    if (id !== req.id){
      return resp.status(400).send({error: `Unauthorised access`})
    }

    const findId = await userModel.findById(id);
    if(!findId){
      return resp.status(404).send({error: `Id not found`})
    }else{
      // if (!req.body){
      //   return resp.status(400).send({error: `Field(s) required to update`})
      // }
      const respo = await userModel.findByIdAndDelete(id);
      return resp.status(200).send({Msg: "User deleted", User: respo});
    }
    
  } catch (error) {
    return resp.status(500).send({error: `Enter valid credentials ${error}`})
  }
  
}
// Above to code to delete user profile...

// const generateAccessTokenAndRefreshToken = async (userId)=>{
//   try {
//     const user = userModel.findById(userId);
//     const userAccessToken = user. generateAccessToken();
//     const userRefreshToken = user.generateRefreshToken();

//     userModel.refreshToken = userRefreshToken;
//     await userModel.save();
//     return {userAccessToken, userRefreshToken};
    
//   } catch (error) {
//     console.log(error);
//   }
// }

// Module exported...
module.exports = {userSignup, userLogin, userProfile, userSignout, userUpdate, deleteUser}