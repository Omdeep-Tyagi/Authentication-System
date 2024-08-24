const express=require("express");
const router=express.Router();
const {getComment,addComment,editComment,deleteComment} =require("../controllers/postController");
const {isLoggedIn}=require("../middleware/isLoggedIn");

// Route to render the 'post' page
router.get("/post",getComment);

// Route for 'create-post' page, only accessible to logged-in users
router.post("/create-post",isLoggedIn,addComment);

// Route to handle the editing of a post, only accessible to logged-in users
router.post('/edit', isLoggedIn,editComment );

// Route to handle the deletion of a post, only accessible to logged-in users
router.post('/delete', isLoggedIn,deleteComment );

module.exports=router;