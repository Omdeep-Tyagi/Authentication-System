
module.exports.isLoggedIn = (req, res, next) => {
    //console.log(req.user);
        // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        // If not authenticated, redirect to the login page
        return res.redirect("/login")
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
};



