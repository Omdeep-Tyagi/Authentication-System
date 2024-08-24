//const asyncHandler= require("express-async-handler");
const User=require("../models/user");
const passport=require("passport");


const signupForm=(req,res)=>{
    res.render("signup.ejs");
};


const signupProcess=async(req,res,next)=>{
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

};


const loginForm=(req,res)=>{
    res.render("login.ejs");
    };


const loginProcess=(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err); // Pass the error to the error handler
        }
        if (!user) {
            res.status(401); // Set status code for unauthorized access
            return next(new Error(info.message || "Invalid username or password")); // Pass the error to the error handler
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Pass the error to the error handler
            }
            return res.redirect("/"); // Redirect to home on successful login
        });
    })(req, res, next);
};


const logoutProcess=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/");
    })};

module.exports={logoutProcess,loginProcess,loginForm,signupProcess,signupForm};