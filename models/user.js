const mongoose= require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Define the user schema
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,// Ensures that the email field is always provided
    },
 });


 // Integrate passport-local-mongoose to add methods and fields required for Passport.js authentication
//Adds methods such as register and authenticate. It also handles password hashing and validation.  
userSchema.plugin(passportLocalMongoose);

// Export the User model based on the defined schema
module.exports= mongoose.model("User",userSchema);