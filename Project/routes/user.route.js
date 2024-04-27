const express = require("express");
const { userSignup, userLogin, userUpdate, userProfile, deleteUser, userSignout } = require("../controllers/user.controller");
// const userModel = require("../models/user.model");
const path = require("path");
const { authenticated, isAdminCheck } = require("../middlewares/authentication.middleware");

const router = express.Router();

const staticPath = path.join(__dirname, "../views");
router.use(express.static(staticPath))
// console.log(staticPath);

// router.set("view engine", "ejs")

router.route("/")
// .get((req, resp)=> resp.sendFile(path.join(staticPath,"signup.html")))
// .get(authenticated, (req, resp)=> resp.send(`
//   User Section:<br><br>
//   <a href="/api/user/profile" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #00b894; color: white; border-radius: 5px">My Details</a>

//   <a href="/api/property/user/data" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #3498db; color: white; border-radius: 5px">My created properties</a>

//   <a href="/api/booking/user/history" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: #3c6382; color: white; border-radius: 5px">My bookings history</a>
// <br><br>
// <form method="post" action= "/api/user/signout">
// <button type="submit" style="border: 2px solid black; padding: 5px; background-color: #e55039; color: white; border-radius: 5px; cursor: pointer;">Logout</button>
// </form>

//   <a href="/" style="text-decoration: none; width:40px; height:80px; border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px">Home</a>
// `))
.get(authenticated, (req, resp)=> resp.render("userpanel"))
.post(userSignup);

router.route("/signup")
// .get((req, resp)=> resp.sendFile(path.join(staticPath,"signup.html")))
.get((req, resp)=> resp.render("signup.ejs"))
.post(userSignup);


router.route("/login")
// .get((req, resp)=> resp.sendFile(path.join(staticPath,"Login.html")))
.get((req, resp)=> resp.render("login"))
.post(userLogin);

router.route("/signout")
// .get((req, resp)=> resp.sendFile(path.join(staticPath,"Login.html")))
.get(authenticated, (req, resp)=> resp.send(`
Want to loged-out/Signed-out???
<form method="post">
<button type="submit" style="border: 2px solid black; padding: 5px; background-color: green; color: white; border-radius: 5px" class="btn btn-primary">Logout</button>
</form>
`))
.post(authenticated, userSignout);

router.route("/profile")
// .get((req, resp)=> resp.sendFile(path.join(staticPath,"Login.html")))
// .get(authenticated, (req, resp)=> resp.render("index"))
.get(authenticated, userProfile)
.post(authenticated, userProfile);

router.route("/update/:id")
.get((req, resp)=> resp.render("updateuser"))
.patch(authenticated, userUpdate);

router.route("/delete/:id")
.get(authenticated, (req, resp)=> resp.render("updateuser"))
.delete(authenticated, deleteUser);

module.exports = router;