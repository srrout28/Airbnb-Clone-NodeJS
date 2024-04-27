const express = require("express");
const { propertyCreation, propertyUpdate, fetchProperty, deleteProperty, propertyReservation, fetchIndivisualProperty, indivisualUserProperty } = require("../controllers/property.controller");
const uploadFile = require("../middlewares/multer.middleware");
const { authenticated } = require("../middlewares/authentication.middleware");
const path = require("path");
const { bookingCreation } = require("../controllers/booking.controller");


const router = express.Router();

const staticPath = path.join(__dirname, "../views");
router.use(express.static(staticPath))

// console.log(staticPath);

router.route("/")
.get(fetchProperty)
// .post(uploadFile.single("image"), propertyCreation);

router.route("/user/data")
.get(authenticated, indivisualUserProperty)

router.route("/specific")
.get(fetchProperty)

router.route("/indivisual/:id")
.get(authenticated, fetchIndivisualProperty)
.post(authenticated, bookingCreation)

router.route("/create")
.get(authenticated, (req, resp)=> resp.render("propertycreation"))
.post(uploadFile.single("image"), authenticated, propertyCreation);

router.route("/reserve")
.get((req, resp)=> resp.render("reservation"))
.post(authenticated, propertyReservation);

router.route("/update/:id")
.get((req, resp)=> resp.send("Property Updated"))
.post(authenticated, propertyUpdate);

router.route("/delete/:id")
.get((req, resp)=> resp.send("Property Deletion..."))
.post(authenticated, deleteProperty);


module.exports = router;