const { model } = require("mongoose");
const bookingModel = require("../models/booking.model");
const propertyModel = require("../models/property.model");
const userModel = require("../models/user.model");


const bookingCreation = async (req, resp)=>{
  try {
    const propertyId = req.params.id;
    // Property Id taken from URL
    const userId = req.id;
    // User Id retrived from cookie
    // console.log(userId);

  // if(!propertyId || !userId){
  // return resp.status(400).send("All fields are mandatory!!!")
  // };

  const user = await userModel.findById(userId);
  const property = await propertyModel.findById(propertyId);

  if (!user){
    return resp.status(401).send("Unable to create order, Login first!!!")
  }
  if (!property){
    return resp.status(404).send("Unable to create order, Property details not found!!!")
  }
  const newBooking = new bookingModel({property:propertyId, user:userId});
  const respo = await newBooking.save();
  return resp.status(201).send(`Congratulations!!! Booking Created successfully...<br><br>Your Booking Id is: ${respo._id}
  <a href="/api/booking/user/history" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Book History</a>
  `);

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`);
  }
  
}
// Above code to book property...

const bookingHistory = async (req, resp)=>{
  try {
  const bookingDetails = await bookingModel.find();

  return resp.status(200).send({" All Booking History...": bookingDetails});

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Above function written to check booking history...

const indivisualBookingHistory = async (req, resp)=>{
  try {
    const userId = req.id;
    // console.log(userId);

  const user = await userModel.findById(userId);
  const bookingDetails = await bookingModel.find();

  if (!user){
    return resp.status(406).send("Unable to create order, Login first!!!")
  }

  const filteredBooking = bookingDetails.filter((item)=>{
    // console.log(JSON.stringify(item.user._id) ==JSON.stringify(userId));
    // console.log(userId);
   return JSON.stringify(item.user._id) === JSON.stringify(userId)
  })
  // const bnc = filteredBooking.map((item)=> item)
  
  // `Hello Your Booking Id is: ${item._id}, Booking Date: ${item.createdAt}`
  // console.log(filteredBooking.map((item)=> item._id));
  // const boId = filteredBooking.map((item)=> item.id);


  return resp.status(200).send({"booking History": filteredBooking});

  } catch (error) {
    return resp.status(500).send(`Internal server error <br> ${error}`)
  }
  
}
// Above function written to check indivisual booking history...

// Module exported...
module.exports = {bookingCreation, bookingHistory, indivisualBookingHistory}