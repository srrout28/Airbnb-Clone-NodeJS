require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser")

const dbConnect = require("./db/config");

const app = express();
const PORT = process.env.LISTING_PORT || 9876; // PORT will start from .env
app.use(cors()); // Allowing cross origin access...
app.use(express.json()) // Converting data to json format...
app.use(cookieParser()) // To parse cookie...
// app.use(bodyparser());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

app.set("view engine", "ejs")
// const staticPath = path.join(__dirname, "../Frontend");
const staticPath = path.join(__dirname, "/views");
app.use("/images", express.static("public"))

app.use(express.static(staticPath))
// Pages statically rentered...

app.get("/", (req, resp)=>{
  console.log(staticPath);
  // resp.sendFile(path.join(staticPath, "/login.html"))
  resp.render("index.ejs")
});
app.post("/", (req, resp)=>{
  resp.send({msg:"HI,POST method Server started..."})
});
// Home page route above..

app.use("/api/user", require("./routes/user.route"))

app.use("/api/property", require("./routes/property.route"))

app.use("/api/booking", require("./routes/booking.route"))

app.use("/api/admin", require("./routes/admin.route"))

// Routs created...


dbConnect().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Server listening on URL http://localhost:${PORT}`);
  });
})
// Database connected and server started