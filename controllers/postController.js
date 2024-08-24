//@desc Get all comments
//@route GET /api/post/post
//@access public
const getComment=(req,res)=>{
    res.render("post"); // EJS automatically finds 'post.ejs' file, no need to specify .ejs extension
};

//@desc Add new comment
//@route POST /api/post/create-post
//@access private
const addComment=(req,res)=>{
    res.status(200).json({message: "Add comment"});
};



//@desc Update comment
//@route PUT /api/post/edit/:id
//@access private
const editComment=(req,res)=>{
   res.status(200).json({message: "Edit comment "});
};

//@desc Delete comment
//@route DELETE /api/post/delete/:id
//@access private
const deleteComment=(req,res)=>{
   res.status(200).json({message: "Delete comment" });
};

module.exports={getComment,addComment,editComment,deleteComment};