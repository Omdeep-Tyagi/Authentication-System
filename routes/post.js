const express=require("express");
const router=express.Router();
const {isLoggedIn}=require("../middleware");

// Route for 'create-post' page, only accessible to logged-in users
router.get("/create-post",isLoggedIn,(req,res)=>{
    res.send("You can add the comment here"); // Placeholder response
});


// Route to render the 'post' page
router.get("/post",(req,res)=>{
    res.render("post"); // EJS automatically finds 'post.ejs' file, no need to specify .ejs extension
});

// Route to handle the deletion of a post, only accessible to logged-in users
router.get('/delete', isLoggedIn, (req, res) => {
    res.send('Comment deleted'); // Placeholder response
});

// Route to handle the editing of a post, only accessible to logged-in users
router.get('/edit', isLoggedIn, (req, res) => {
    // Handle the editing of the post
    res.send('Edit Comment here'); // Placeholder response
});

module.exports=router;