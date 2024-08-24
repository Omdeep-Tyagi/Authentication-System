const express=require("express");
const router=express.Router();
const {logoutProcess,loginProcess,loginForm,signupProcess,signupForm} =require("../controllers/userController");
const passport=require("passport");


// Route to render the signup page and to handle user signup 
router.route("/signup")
    .get(signupForm)
    .post(signupProcess);

// Route to render the login page and to handle user login
router.route("/login")
   .get(loginForm)
   .post(loginProcess);


// Route to handle user logout
router.get("/logout",logoutProcess);
  
module.exports=router;