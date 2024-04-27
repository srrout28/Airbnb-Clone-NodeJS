const express = require("express");
const mongoose= require("mongoose");
const propertyModel = require("../models/property.model");
const userModel = require("../models/user.model");

const allUsers = async (req, resp)=>{
  try {
    const users = await userModel.find()
    // console.log(users);
    return resp.status(200).send({users});
  } catch (error) {
    console.log(error);
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
}
// Above code to fetch all users...

const updateUser = async (req, resp)=>{
  try {
    const userId = req.params.id;
    // Inserted user Id
    const operatorId = req.id;
    // Operating user who signed in
    const operatingUser = await userModel.findById(operatorId);
    // console.log(operatingUser.isAdmin);
    if (!operatingUser.isAdmin){
      return resp.status(400).send({error: `Unauthorised access`})
    }

    const findUser = await userModel.findById(userId);
    if(!findUser){
      return resp.status(404).send({error: `User not found`})
    }else{
      // if (!req.body){
      //   return resp.status(400).send({error: `Field(s) required to update`})
      // }
      const respo = await userModel.findByIdAndUpdate(userId, req.body);
      return resp.status(200).send({Msg: "User Updated", User: respo});
    }
    
  } catch (error) {
    return resp.status(500).send({error: `Enter valid credentials ${error}`})
  }
  
}
// Above controller to update user...

const deleteUserByAdmin = async (req, resp)=>{
  try {
    const id = req.params.id;
    // Inserted user Id from URL
    // if (id !== req.id){
    //   return resp.status(400).send({error: `Unauthorised access`})
    // }

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
// Above controller to detete user only by admin...


// Module exported...
module.exports = {allUsers, updateUser, deleteUserByAdmin}