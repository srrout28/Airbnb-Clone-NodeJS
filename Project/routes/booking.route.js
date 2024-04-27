const express = require("express");
const { authenticated, isAdminCheck } = require("../middlewares/authentication.middleware");
const path = require("path");
const { bookingCreation, indivisualBookingHistory, bookingHistory } = require("../controllers/booking.controller");


const router = express.Router();

const staticPath = path.join(__dirname, "../views");
router.use(express.static(staticPath))

// console.log(staticPath);

router.route("/create/:id")
.get(authenticated, bookingCreation)
// .post(uploadFile.single("image"), propertyCreation);


router.route("/user/history")
.get(authenticated, indivisualBookingHistory)
// .post(uploadFile.single("image"), propertyCreation);

router.route("/admin/history")
.get(authenticated, isAdminCheck, bookingHistory)
// .post(uploadFile.single("image"), propertyCreation);

module.exports = router;