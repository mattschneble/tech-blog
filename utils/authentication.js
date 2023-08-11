// create a function to check and see if the user is logged in
function withAuth(req, res, next) {
    // if the user is not logged in, redirect the user to the login page
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        // if the user is logged in, execute the route function
        next();
    }
};