//basic setup
const express=require("express");
const app=express();
const mongoose = require("mongoose");
const passport =require("passport");
const LocalStrategy = require("passport-local");
const User= require('./models/user.js');
const session=require("express-session");
const methodOverride = require("method-override");
const path=require("path");
const userRouter=require("./routes/user");
const postRouter=require("./routes/post");
const MongoStore = require('connect-mongo');
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();// load environment variables from .env file

// Connecting to the MongoDB database
const MONGO_URL=process.env.MONGO_URL; // Get MongoDB URL from environment variables

main()
    .then(()=>{
      console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

//basic setting
app.set("view engine","ejs"); 
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));


// Middleware for parsing request body
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Session configuration
const sessionOptions={
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        touchAfter: 24 * 3600 // time period in seconds
      }),
    cookie:{
        expires:Date.now()+7*24*60*60*1000, // Set cookie expiration to 7 days
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}


app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));// Configure Passport to use LocalStrategy

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Ensure that this middleware is defined before any routes that use currUser.
app.use((req, res, next) => {
   // console.log(req.user); // Check if req.user is defined
    res.locals.currUser = req.user;
    next();
});

// Route for the home page
app.get('/',(req,res)=>{
    res.render("hero.ejs");
})

// Use imported routers
app.use("/",userRouter);
app.use("/",postRouter);
app.use(errorHandler);
 
// Start the server at specified port
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
});



  
