const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport=require("passport");


// Route to render the signup page
router.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

// Route to handle user signup
router.post("/signup",async(req,res,next)=>{
    try{
        let {username,email,password }=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
         // Log the user in after registration
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);  // Pass errors to the error-handling middleware
            }
            res.redirect("/"); // Redirect to the home page upon successful login
        })  ;

    }catch(err)
    {
        res.send(err.message);
    }

});

// Route to render the login page
router.get("/login",(req,res)=>{
    res.render("login.ejs");
});

// Route to handle user login
router.post("/login",
    passport.authenticate("local",{ failureRedirect: '/error', }), // Authenticate using local strategy, redirect to /error on failure
     async(req,res)=>{
        res.redirect("/"); 

});

// Route to display an error message for login failures
router.get("/error",(req,res)=>{
    res.send("Wrong username or password");
})

// Route to handle user logout
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/");
    })
   
});
  
module.exports=router;