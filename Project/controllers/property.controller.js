const express = require("express");
const mongoose= require("mongoose");
const propertyModel = require("../models/property.model");
const userModel = require("../models/user.model");

const propertyCreation = async (req, resp)=>{
  try {
    const {description, location, price, rating} =await req.body;
    const image = await req.file.filename;
    const userId = req.id;
    // Details taken from body and user id from cookie
    // console.log(userId);
    const locationCap = location.charAt(0).toUpperCase()+location.slice(1);

  if(!description || !image || !location || !price || !userId){
  return resp.status(400).send("All fields are mandatory!!!")
  };

  const user = await userModel.findById(userId);
  if (!user){
    return resp.status(400).send("Unable to create Object, Invalid user!!!")
  }
  const newProperty = new propertyModel({description, image, location:locationCap, price, rating:0, user:userId});
  const respo = await newProperty.save();
  return resp.status(201).send(`Property Created successfully!!! 
  Property Details:
  Name:${respo.description},
  Image:${respo.image},
  Location:${respo.location},
  Price:${respo.price}
  <br><br>
  <a href="/api/user" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Goto Profile Page</a>
  <br><br>
  <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Home</a>
  `);

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Above code for property creation...

const fetchProperty = async (req, resp)=>{
  try {
    const allProperties = await propertyModel.find();
    // console.log(allProperties);
    allProperties.forEach((item)=>{
      // console.log(item);
      const id = item._id
      const description = item.description
      const image = item.image
      const location = item.location;
      const price = item.price;
      const rating = item.rating;
      const user = item.user;
      // console.log(id, description, image, location, price, rating, user);
    })
    

    return resp.status(200).send(allProperties)

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Above code for fetch property details...

const fetchIndivisualProperty = async (req, resp)=>{
  try {
    const propertyId = req.params.id;
    // const propertyId = req.body;
    const indivisualProperty = await propertyModel.findById(propertyId);
    // console.log(allProperties);
    return resp.status(200).send(`
    <div class= "container" style="width:99vw; height: 98vh; text-align: center">
    <h3 style= "text-align: center">Confirm below details</h3>
    <img src="http://localhost:6789/images/property-img/${indivisualProperty.image}" alt="Property Image" width= 500px height=300px style="border: 1px solid gray">
    <h3>Booking details: ${indivisualProperty.description}</h3>
    <h3>Location: ${indivisualProperty.location}</h3>
    <h3>Price: ${indivisualProperty.price}/- per night </h3>
    <h3>Rating: ${indivisualProperty.rating} ✮</h3>
    <a href="/api/booking/create/${indivisualProperty._id}" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Confirm</a>
    <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Home</a>
    </div>
    `)

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Above code for fetch indivisual property details...

const indivisualUserProperty = async (req, resp)=>{
  try {
    const userId = req.id;
    // console.log(userId);

  const user = await userModel.findById(userId);
  const propertyDetails = await propertyModel.find();

  if (!user){
    return resp.status(406).send("Unable to create order, Login first!!!")
  }

  const filteredProp = propertyDetails.filter((item)=>{
   return JSON.stringify(item.user._id) === JSON.stringify(userId)
  })
  return resp.status(200).send({"booking History": filteredProp});

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Above code for update property details...

const propertyUpdate = async (req, resp)=>{
  try {
    const propertyId = req.params.id;

    const propertyDetails = await propertyModel.findById(propertyId);

    if(!propertyDetails){
      return resp.status(400).send({error: `Invalid Property Id`})
    }else{
      if(!req.body) return resp.status(400).send({error: `Body is empty`});

      const respo = await propertyModel.findByIdAndUpdate(id, req.body);
      return resp.status(200).send({Msg: "Property Updated", Property: respo});
    }
    
  } catch (error) {
    return resp.status(500).send({error: `Enter valid credentials ${error}`})
  }
  
}
// Above code for update property details...

const deleteProperty = async (req, resp)=>{
  try {
    const id = req.params.id;

    const findPropertyId = await propertyModel.findById(id);

    if(!findPropertyId){
      return resp.status(400).send({error: `Invalid Property Id`})
    }else{
      const respo = await propertyModel.findByIdAndDelete(id);
      return resp.status(200).send({Msg: "Property deleted successfully!!!", Property: respo});
    }
    
  } catch (error) {
    return resp.status(500).send({error: `Enter valid credentials ${error}`})
  }
  
}
// Above code to delete property details...

const propertyReservation = async (req, resp)=>{
  try {
    const id =await req.body;
    const findProperty = await propertyModel.findById(id)
    const userId = req.id;
    // console.log(userId);

  if(!description || !image || !location || !price || !userId){
  return resp.status(400).send("All fields are mandatory!!!")
  };

  const user = await userModel.findById(userId);
  if (!user){
    return resp.status(404).send("Unable to create Object, Invalid user!!!")
  }
  const newProperty = new propertyModel({description, image, location, price, rating:0, user:userId});
  const respo = await newProperty.save();
  return resp.status(201).send(`Property Created successfully!!! ${respo}`);

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Developmental code to reserve hotel...

module.exports = {propertyCreation, propertyUpdate, fetchProperty, fetchIndivisualProperty, indivisualUserProperty, deleteProperty, propertyReservation}
