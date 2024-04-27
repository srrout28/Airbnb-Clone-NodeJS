const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const hashedPassword = async (password)=>{
  const dynamicSalt = await bcrypt.genSalt(12);
  // console.log(dynamicSalt);
  const encryptPassword = await bcrypt.hash(password, dynamicSalt);
  // console.log(encryptedPassword);
  return encryptPassword;
}
// Password Hashed...


const passwordMatching = async (inputPassword, dbPassword)=>{
  const compirePassword = await bcrypt.compare(inputPassword, dbPassword);
  // console.log(compirePassword);
  return compirePassword;
}
// Code to Match inserted password with hashed database password...

const authenticated = async (req, resp, next)=>{
  try {
    const generatedToken = await req.cookies.accessToken;
    // const decodedToken = generatedToken.split(" ")[1];
    // console.log(decodedToken);

    if(!generatedToken){
      return resp.status(401).send(`Login first to access!!!.<br><br>
      <a href="/api/user/login" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: 4f772d; color: white; border-radius: 5px">Login</a>
      
      <a href="/api/user/signup" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: 003554; color: white; border-radius: 5px">Signup</a>

      <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: 3c6e71; color: white; border-radius: 5px">Home</a>
      `);
    }
    const privateKey = process.env.ACCESS_TOKEN_SECRET;
    const verifyToken = jwt.verify(generatedToken, privateKey);
    // console.log(verifyToken);
    // console.log("Hello");
    if(!verifyToken){
      return resp.status(401).send(`Unauthorized access`);
    }

    req.id = verifyToken.id
    next();
  } catch (error) {
    console.log(`Error Occured ${error}`);
    resp.status(500).send(`Error <br> ${error}`)
  }
}
// Above code to authorize a user

const isAdminCheck = async (req, resp, next)=>{
  try {
    const id = req.id;
    const user = await userModel.findById(id);
    // console.log(user);

    if(!user){
      return resp.status(401).send(`Invalid User.`);
    };

    if(!user.isAdmin){
      return resp.status(401).send(`You are not admin/authorised to access...
      <br><br>
      <a href="/api/user" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #16a085; color: white; border-radius: 5px">Access own profile section</a>

      <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #27ae60; color: white; border-radius: 5px">Home</a>
      `);
    }
    next();
  } catch (error) {
    console.log(`Error Occured ${error}`);
    resp.status(500).send(`Error <br> ${error}`)
  }
}
// Code to check administration power...

// const authenticated = async (req, resp, next)=>{
//   try {
//     console.log("hii....");
//     const generatedToken = await req.headers.authorization;
//     const decodedToken = await generatedToken.split(" ")[1];
//     console.log(decodedToken);

//     if(!generatedToken || !decodedToken){
//       return resp.status(401).send(`Token not found or tampered.`);
//     }
//     const privateKey = process.env.ACCESS_TOKEN_SECRET;
//     const verifyToken = jwt.verify(decodedToken, privateKey);
//     console.log(verifyToken);
//     console.log("Hello");
//     if(!verifyToken){
//       return resp.status(401).send(`Unauthorized access`);
//     }

//     req.id = verifyToken.id
//     next();
//   } catch (error) {
//     console.log(`Error Occured ${error}`);
//     resp.status(500).send(`Error <br> ${error}`)
//   }
// }


// Modules exported...
module.exports = {hashedPassword, passwordMatching, authenticated, isAdminCheck};

