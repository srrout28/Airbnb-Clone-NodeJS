const express = require("express");
const path = require("path");
const { authenticated, isAdminCheck } = require("../middlewares/authentication.middleware");
const { updateUser, allUsers, deleteUserByAdmin } = require("../controllers/admin.controller");
const { fetchProperty, propertyUpdate, deleteProperty } = require("../controllers/property.controller");
const { deleteUser } = require("../controllers/user.controller");

const router = express.Router();

const staticPath = path.join(__dirname, "../views");
router.use(express.static(staticPath));

router.route("/").get(authenticated,isAdminCheck, (req, resp)=>{
  resp.render("adminpanel")
})

router.route("/allproperty")
.get(authenticated,isAdminCheck, fetchProperty)
// .post(authenticated,isAdminCheck, fetchProperty);

router.route("/allusers")
.get(authenticated,isAdminCheck, allUsers)
.post(authenticated,isAdminCheck, allUsers);

router.route("/update/user/:id")
.get((req, resp)=> resp.render("updateuser"))
.patch(authenticated,isAdminCheck, updateUser);

router.route("/update/property/:id")
.get((req, resp)=> resp.render("updateuser"))
.patch(authenticated,isAdminCheck, propertyUpdate);

router.route("/delete/user/:id")
.get(authenticated, (req, resp)=> resp.render("updateuser"))
.delete(authenticated,isAdminCheck, deleteUserByAdmin);

router.route("/delete/property/:id")
.get(authenticated, (req, resp)=> resp.render("updateuser"))
.delete(authenticated,isAdminCheck, deleteProperty);


module.exports = router;